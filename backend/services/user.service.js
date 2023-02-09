const passwordHash = require("password-hash");

const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

const getUsers = async (query) => {
  // const users = await User.find({}).select("-password").lean();
  const { page, limit } = query;

  const filters = {},
    sortBy = {};

  const users = await User.find(filters)
    .sort(sortBy)
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1))
    .lean();

  const totalPages = (await User.find(filters).lean()).length / limit;

  const data = {
    items: users.map((item) => ({
      ...item,
    })),
    totalPages: Math.ceil(totalPages) || 1,
  };

  return data || {};

  return users || [];
};

const getById = async (_id) => {
  const user = await User.findOne({ _id }).select("-password").lean();

  return user || {};
};

const getUserHistory = async (_id) => {
  const user = await User.findOne({ _id }).select("-password").lean();

  const history = user.history;
  const userHistory = [];

  for (const h of history) {
    const order = await Order.findOne({ _id: h.orderId }).lean();

    let newProducts = [];

    for (const product of order.products) {
      const p = await Product.findOne({ _id: product.productId }).lean();

      if (p) newProducts.push({ ...product, name: p.name });
    }

    const newOrder = { ...order, products: newProducts };

    userHistory.push(newOrder);
  }

  return userHistory;
};

const deleteUser = async (_id) => {
  const user = await User.findOne({ _id });

  if (!user) throw new Error("User not found");

  await user.remove();
};

module.exports = {
  getUsers,
  getById,
  getUserHistory,
  deleteUser,
};
