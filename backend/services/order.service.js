const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const { OrderStatus } = require("../utils/constants");

const getOrders = async () => {
  const order = await Order.find({}).lean();

  return order || [];
};

const getById = async (_id) => {
  const order = await Order.findOne({ _id }).lean();

  return order || {};
};

const createOrder = async (data) => {
  const { userId, address, phoneNumber, status, products } = data;

  const userExist = await User.findOne({ _id: userId }).lean();
  if (!userExist) throw new Error("Invalid user ID");

  if (!address.trim()) throw new Error("Invalid address");

  if (phoneNumber.length < 10 || !Number(phoneNumber))
    throw new Error("Invalid phone number");

  if (!Object.values(OrderStatus).includes(status))
    throw new Error("Invalid order status");

  let amount = 0;

  for (index in products) {
    const product = await Product.findOne({
      _id: products[index].productId,
    });

    if (!product) throw new Error("Invalid product ID");

    if (products[index].quantity > product.quantity || product.quantity < 1)
      throw new Error(
        `Not enough product ${product.name + " " + product.description}`
      );

    amount += product.price * products[index].quantity;

    product.quantity = product.quantity - products[index].quantity;

    await product.save();
  }

  const newOrder = new Order({
    userId,
    address,
    phoneNumber,
    status,
    products,
    amount: Number(amount),
  });

  await newOrder.save();
};

const updateOrder = async (_id, data) => {};

const deleteOrder = async (_id) => {
  const order = await Order.findOne({ _id });

  if (!order) throw new Error("Order not found");

  await order.remove();
};

module.exports = { getOrders, getById, createOrder, updateOrder, deleteOrder };
