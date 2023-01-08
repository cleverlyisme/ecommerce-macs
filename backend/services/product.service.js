const Product = require("../models/product.model");
const Category = require("../models/category.model");
const _ = require("lodash");
const environments = require("../utils/environments");

const { BACKEND_URL } = environments;

const getProducts = async (query) => {
  const { page, limit, categoryId } = query;

  const products = await Product.find({
    categoryId: categoryId || { $regex: "" },
  })
    .sort({
      name: "asc",
    })
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1))
    .lean();

  const totalPages =
    (await Product.find({ categoryId: categoryId || { $regex: "" } }).lean())
      .length / limit;

  return {
    items:
      products.map((product) => ({
        ...product,
        images: product.images.map((img) => `${BACKEND_URL}/images/${img}`),
      })) || [],
    totalPages: Math.ceil(totalPages) || 1,
  };
};

const getById = async (_id) => {
  const product = await Product.findOne({ _id }).lean();

  return (
    {
      ...product,
      images: product.images.map((img) => `${BACKEND_URL}/images/${img}`),
    } || {}
  );
};

const createProduct = async (data) => {
  const { name, description, images, price, quantity, categoryId } = data;

  if (!name.trim() || !description.trim())
    throw new Error("Invalid name or description");

  const category = await Category.findOne({ _id: categoryId }).lean();
  if (!category) throw new Error("Invalid category ID");

  const newProduct = new Product({
    name,
    description,
    images: images || [],
    price: Number(price),
    quantity: Number(_.random(0, 30)),
    categoryId,
  });

  await newProduct.save();
};

const updateProduct = async (_id, data) => {
  const product = await Product.findOne({ _id });

  const { name, description, images, price, quantity, sold, categoryId } = data;

  const productExist = await Product.findOne({ name }).lean();
  if (productExist && product.name !== name) throw new Error("Product exists");

  const category = await Category.findOne({ _id: categoryId }).lean();
  if (!category) throw new Error("Invalid category ID");

  product.name = name || product.name;
  product.description = description || product.description;
  product.images = images || product.images;
  product.price = Number(price) || product.price;
  product.quantity = Number(quantity) || product.quantity;
  product.sold = Number(sold) || product.sold;
  product.categiryId = categoryId || product.categiryId;

  await product.save();
};

const deleteProduct = async (_id) => {
  const product = await Product.findOne({ _id });

  if (!product) throw new Error("Product not found");

  await product.remove();
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
