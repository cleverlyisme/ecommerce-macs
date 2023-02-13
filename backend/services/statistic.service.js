const Order = require("../models/order.model");
const Product = require("../models/product.model");

const { OrderStatus } = require("../utils/constants");

const getStatistic = async (query) => {
  const { from, to, page, limit } = query;

  const filter = {};

  if (from)
    filter.updatedAt = {
      ...filter.updatedAt,
      $gte: Number(from),
    };

  if (to) filter.updatedAt = { ...filter.updatedAt, $lt: Number(to) };

  filter.status = OrderStatus.Completed;

  const orders = await Order.find(filter)
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1))
    .lean();

  const totalPages = (await Order.find(filter).lean()).length / limit;

  const amount = orders.reduce((iniValue, order) => iniValue + order.amount, 0);

  let newOrders = [];

  for (const order of orders) {
    const newProducts = [];

    for (const product of order.products) {
      const p = await Product.findOne({ _id: product.productId })
        .select("name")
        .lean();

      if (p) newProducts.push({ ...product, name: p.name });
    }

    newOrders.push({ ...order, products: newProducts });
  }

  return {
    items: { orders: newOrders, amount },
    totalPages: Math.ceil(totalPages) || 1,
  };
};

module.exports = { getStatistic };
