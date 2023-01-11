const service = require('../services/photo.service');

const upload = async (req, res) => {
  try {
    const ids = await service.upload(req.files);
    return res.status(200).send(ids);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const get = async (req, res) => {
  try {
    const data = await service.get(req.params.id);
    res.contentType('image/jpeg');
    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { upload, get };
