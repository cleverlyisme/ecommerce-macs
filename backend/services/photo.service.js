const fs = require('fs');
const Image = require('../models/image.model');

const upload = async (files) => {
  if (files) {
    const ids = [];
    const paths = [];
    for (const file of files) {
      const img = fs.readFileSync(file.path);
      const encodedImage = img.toString('base64');

      const image = {
        contentType: file.mimetype,
        image: new Buffer(encodedImage, 'base64'),
      };

      const newImage = new Image(image);
      await newImage.save();
      ids.push(newImage.id);
      paths.push(file.path);
    }

    console.log({ paths });
    paths.map((path) => fs.unlinkSync(path));
    return ids;
  }

  return [];
};

const get = async (_id) => {
  const res = await Image.findOne({ _id });
  if (!res) throw new Error('404');

  return res.image;
};

module.exports = { upload, get };
