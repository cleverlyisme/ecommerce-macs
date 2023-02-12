const Order = require("../models/order.model");

const { OrderStatus } = require("../utils/constants");

const getStatistic = async (query) => {
  const { from, to, page, limit } = query;

  const filter = {};

  if (from) filter.updatedAt = { $gte: Number(from) };

  if (to) filter.updatedAt = { $lt: Number(to) };

  filter.status = OrderStatus.Completed;

  const orders = await Order.find(filter)
    .limit(Number(limit))
    .skip(Number(limit) * Number(page) - 1)
    .lean();

  const totalPages = (await Order.find(filter).lean()).length / limit;

  const amount = orders.reduce((iniValue, order) => iniValue + order.amount, 0);

  const productStatistic = {};

  for (const order of orders) {
    for (const product of order.products)
      Object.assign(productStatistic, {
        [product.productId]: {
          quantity:
            product.quantity +
            (productStatistic[product.productId]?.quantity ?? 0),
          price: product.price,
        },
      });
  }

  const products = Object.keys(productStatistic).map((productId) => ({
    productId,
    quantity: productStatistic[productId].quantity,
    price: productStatistic[productId].price,
    amount:
      productStatistic[productId].quantity * productStatistic[productId].price,
  }));

  return {
    items: { orders, products, amount },
    totalPages: Math.ceil(totalPages) || 1,
  };
};

module.exports = { getStatistic };
