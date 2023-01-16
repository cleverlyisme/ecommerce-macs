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
  const { name, cpu } = data;

  const categoryExist = await Category.findOne({ name }).lean();
  if (categoryExist) throw new Error("Category existed");

  if (!name.trim()) throw new Error("Invalid category");

  const newCategory = new Category({ name, cpu: cpu || [] });

  await newCategory.save();
};

const updateCategory = async (_id, data) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  const { name } = data;

  const categoryExist = await Category.findOne({ name });
  if (name !== category.name && categoryExist)
    throw new Error("Category existed");

  if (!name.trim()) throw new Error("Invalid category");

  category.name = name;

  await category.save();
};

const createCpu = async (_id, data) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  const { text } = data;

  if (!text.trim()) throw new Error("Invalid CPU text");

  const cpus = category.cpu;

  const newCpus = [...cpus, { text }];

  category.cpu = newCpus;

  await category.save();
};

const updateCpu = async (_id, data) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  const { cpuId, text } = data;
  const cpus = category.cpu;

  const cpuFound = cpus.find((cpu) => cpu._id.toString() === cpuId);
  if (!cpuFound) throw new Error("CPU not found");

  if (!text.trim()) throw new Error("Invalid CPU text");

  const cpuExist = cpus.find(
    (cpu) => cpu._id.toString() !== cpuId && cpu.text === text
  );
  if (cpuExist) throw new Error("CPU existed");

  const newCpus = cpus.map((cpu) => {
    if (cpu._id.toString() === cpuId) return { ...cpu, text };
    return cpu;
  });

  category.cpu = newCpus;

  await category.save();
};

const deleteCategory = async (_id) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  await category.remove();
};

const deleteCpu = async (_id, cpuId) => {
  const category = await Category.findOne({ _id });

  if (!category) throw new Error("Category not found");

  const newCpu = category.cpu.filter((c) => c._id.toString() !== cpuId);

  category.cpu = newCpu;

  await category.save();
};

module.exports = {
  getCategories,
  getById,
  createCategory,
  createCpu,
  updateCategory,
  updateCpu,
  deleteCategory,
  deleteCpu,
};
