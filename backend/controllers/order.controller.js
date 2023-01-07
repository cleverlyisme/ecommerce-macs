const service = require("../services/order.service");

const getOrders = async (req, res) => {
  try {
    const orders = await service.getOrders();

    res.status(200).send(orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await service.getById(id);

    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, address, phoneNumber, status, products } = req.body;

    await service.createOrder({
      userId,
      address,
      phoneNumber,
      status,
      products,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    res.status(200).send("Updated");
  } catch (err) {
    err.message === "Order not found"
      ? res.status(404).send(err.message)
      : res.status(400).send(err.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteOrder(id);

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = { getOrders, getById, createOrder, updateOrder, deleteOrder };
