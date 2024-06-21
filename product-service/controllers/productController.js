const productService = require('../services/productService');
const  {encrypt}  =require('../middleware/encryption')
const {decrypt} =require('../middleware/encryption')
const Product = require('../models/product');
const axios =require('axios')

const createProduct = async (req, res) => {
  try {
    const { name, price, description,stock } = req.body;
    const product = await productService.createProduct(name, price, description,stock);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductByIdEncrypted = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    const encryptedData = encrypt(JSON.stringify(product))
    res.status(200).json(encryptedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reducestock = async (req,res)=>{
  try {
    const {id} = req.params;
    const {userquantity}=req.body
    console.log(id)
    console.log(userquantity)    
    // const products = await Product.findByPk(id);
    const product = await axios.get(`http://localhost:3001/product/Encryptedproduct/${id}`)
    const data=product.data
    const dataa = JSON.parse(decrypt(data))
    console.log(dataa.stock)
    const newvalue = dataa.stock-userquantity
    console.log(newvalue)
    await Product.update({stock:newvalue} ,{where: {id:id}})
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ error: error.message } );
  }
}

module.exports = { createProduct, getAllProducts, getProductById ,reducestock,getProductByIdEncrypted};
