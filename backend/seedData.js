const mongoose = require("mongoose");
const _ = require("lodash");

const environments = require("./utils/environments");

const { MONGO_ATLAS_URI } = environments;

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_ATLAS_URI, {
  autoIndex: true,
  autoCreate: true,
});

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log("MongoDB connected successfully");

  await generateData();

  console.log("Added data to MongoDB");
});

const generateData = async () => {
  const User = require("./models/user.model");
  const Category = require("./models/category.model");
  const Product = require("./models/product.model");

  const { sampleUsers, sampleProducts } = require("./utils/sampleData");

  sampleUsers.map(async (u) => {
    const user = new User({
      username: u.username,
      password: u.password,
    });
    await user.save();
  });

  sampleProducts.map(async (p) => {
    const category = await Category.findOne({ name: p.status }).lean();
    const product = new Product({
      name: p.name,
      description: p.description,
      images: [
        "https://macone.vn/wp-content/uploads/2022/06/macbook-air-midnight-gallery2-20220606_GEO_US-1024x786.jpeg",
      ],
      price: p.price,
      quantity: Number(_.random(0, 30)),
      categoryId: category._id.toString(),
    });
    await product.save();
  });
};
