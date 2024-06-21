const Product = require('../models/product');

const createProduct = async (name, price, description,stock) => {
  return Product.create({ name, price, description,stock });
};

const getAllProducts = async () => {
  return Product.findAll();
};

const getProductById = async (id) => {
  return Product.findByPk(id);
};



module.exports = { createProduct, getAllProducts, getProductById };
