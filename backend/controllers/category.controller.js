const service = require("../services/category.service");

const getCategories = async (req, res) => {
  try {
    const categories = await service.getCategories();

    res.status(200).send(categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await service.getById(id);

    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    await service.createCategory({ name });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await service.updateCategory(id, { name });

    res.status(200).send("Updated");
  } catch (err) {
    err.message === "Category not found"
      ? res.status(404).send(err.message)
      : res.status(400).send(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteCategory(id);

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  getCategories,
  getById,
  createCategory,
  updateCategory,
  deleteCategory,
};
