const Order = require('../models/order');


const createOrder = async (productId, userName, quantity) => {
  return Order.create({ productId, userName, quantity });
};

const getAllOrders = async () => {
  return Order.findAll();
};

const getOrderById = async (id) => {
  return Order.findByPk(id);
};

module.exports = { createOrder, getAllOrders, getOrderById };
