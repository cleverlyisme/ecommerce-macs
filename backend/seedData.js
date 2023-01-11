const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const _ = require("lodash");

const environments = require("./utils/environments");

const { MONGO_ATLAS_URI } = environments;
const {
  sampleUsers,
  sampleProducts,
  sampleCategories,
} = require("./utils/sampleData");

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_ATLAS_URI, {
  autoIndex: true,
  autoCreate: true,
});

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log("MongoDB connected successfully");
  try {
    await generateCategoryData();
    await generateUserData();
    await generateProductData();
  } catch (err) {
    console.log(err.message);
  }

  console.log("Added data to MongoDB");
});

const generateUserData = async () => {
  const User = require("./models/user.model");
  for (const u of sampleUsers) {
    const user = new User({
      username: u.username,
      password: passwordHash.generate(u.password),
    });

    await user.save();
  }
};

const generateCategoryData = async () => {
  const Category = require("./models/category.model");
  for (const c of sampleCategories) {
    const category = new Category({
      name: c.name,
    });

    await category.save();
  }
};

const generateProductData = async () => {
  const Category = require("./models/category.model");
  const Product = require("./models/product.model");

  for (const p of sampleProducts) {
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
  }
};
