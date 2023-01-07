const Category = require("../models/category.model");

const getCategories = async () => {
  const categories = await Category.find({}).lean();

  return categories || [];
};

const getById = async (_id) => {
  const category = await Category.findOne({ _id }).lean();

  return category || {};
};

const createCategory = async (data) => {
  const { name } = data;

  const categoryExist = await Category.findOne({ name }).lean();
  if (categoryExist) throw new Error("Category existed");

  if (!name.trim()) throw new Error("Invalid category");

  const newCategory = new Category({ name });

  await newCategory.save();
};

const updateCategory = async (_id, data) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  const { name } = data;

  const categoryExist = await Category.findOne({ name });
  if (name !== category.name && categoryExist)
    throw new Error("Category existed");

  if (!name.trim() || name.includes(" ")) throw new Error("Invalid category");

  category.name = name;

  await category.save();
};

const deleteCategory = async (_id) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  await category.remove();
};

module.exports = {
  getCategories,
  getById,
  createCategory,
  updateCategory,
  deleteCategory,
};
