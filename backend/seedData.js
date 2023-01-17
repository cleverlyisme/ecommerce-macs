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
    // await generateCategoryData();
    // await generateUserData();
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
      email: u.email,
      phone: u.phone,
      role: u.role,
      password: passwordHash.generate(u.password),
      history: [],
    });
    await user.save();
  }
};

const generateCategoryData = async () => {
  const Category = require("./models/category.model");
  for (const c of sampleCategories) {
    const category = new Category({
      name: c.name,
      cpu: c.cpu,
    });
    await category.save();
  }
};

const generateProductData = async () => {
  const Category = require("./models/category.model");
  const Product = require("./models/product.model");

  for (const p of sampleProducts) {
    const category = await Category.findOne({ name: p.categoryName }).lean();
    const cpu = category.cpu.find((c) => c.text === p.cpuName);

    const product = new Product({
      name: p.name,
      description: p.description,
      images: ["63be6bd0c2f8b9c129e2b786"],
      price: p.price,
      quantity: Number(_.random(0, 30)),
      status: p.status,
      categoryId: category._id.toString(),
      cpuId: cpu._id.toString(),
    });

    await product.save();
  }
};
