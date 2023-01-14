const service = require("../services/product.service");

const getProducts = async (req, res) => {
  try {
    const { page, limit, categoryId, gt, lt, price } = req.query;
    const products = await service.getProducts({
      page,
      limit,
      categoryId,
      gt,
      lt,
      price,
    });

    res.status(200).send(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, images, price, quantity, categoryId } = req.body;

    await service.createProduct({
      name,
      description,
      images,
      price,
      quantity,
      categoryId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, images, price, quantity, sold, categoryId } =
      req.body;

    await service.updateProduct(id, {
      name,
      description,
      images,
      price,
      quantity,
      sold,
      categoryId,
    });

    res.status(200).send("Updated");
  } catch (err) {
    err.message === "Product not found"
      ? res.status(404).send(err.message)
      : res.status(400).send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteProduct(id);

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
