const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const { OrderStatus } = require("../utils/constants");

const getOrders = async () => {
  const orders = await Order.find({}).lean();

  let newOrders = [];

  for (const order of orders) {
    const newProducts = [];

    for (const product of order.products) {
      const p = await Product.findOne({ _id: product.productId }).lean();

      if (p) newProducts.push({ ...product, name: p.name });
    }

    newOrders.push({ ...order, products: newProducts });
  }

  return newOrders || [];
};

const getById = async (_id) => {
  const order = await Order.findOne({ _id }).lean();

  return order || {};
};

const createOrder = async (data) => {
  const { userId, name, address, phoneNumber, products, note } = data;

  if (!address.trim()) throw new Error("Invalid address");

  if (phoneNumber.length < 10) throw new Error("Invalid phone number");

  let amount = 0;

  for (const p of products) {
    const product = await Product.findOne({
      _id: p.productId,
    });

    if (!product) throw new Error("Invalid product ID");

    if (p.quantity > product.quantity || product.quantity < 1)
      throw new Error(
        `Not enough product ${product.name + " " + product.description}`
      );

    amount += product.price * p.quantity;

    product.quantity = product.quantity - p.quantity;
    product.sold = (product.sold || 0) + 1;

    await product.save();
  }

  const newOrder = new Order({
    name,
    address,
    phoneNumber,
    status: OrderStatus.Pending,
    products,
    note: note || "",
    amount: Number(amount),
  });

  await newOrder.save();

  if (userId) {
    const user = await User.findOne({ _id: userId });

    user.history = [...user.history, { orderId: newOrder._id.toString() }];

    await user.save();
  }
};

const updateOrder = async (_id, data) => {
  const order = await Order.findOne({ _id });

  if (!order) throw new Error("Order not found");

  const { status } = data;

  if (!Object.values(OrderStatus).includes(status))
    throw new Error("Invalid order status");

  order.status = status;

  if (status === "Canceled") {
    for (const p of order.products) {
      const product = await Product.findOne({ _id: p.productId });

      product.quantity += p.quantity;

      await product.save();
    }
  }

  await order.save();
};

const deleteOrder = async (_id) => {
  const order = await Order.findOne({ _id });

  if (!order) throw new Error("Order not found");

  await order.remove();
};

module.exports = { getOrders, getById, createOrder, updateOrder, deleteOrder };
