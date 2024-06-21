const orderService = require('../services/orderService');
const transporter = require('../middlewware/mail')
const axios =require('axios')

const createOrder = async (req, res) => {
  try {
    const { productId, userName, quantity } = req.body;
    const order = await orderService.createOrder(productId, userName, quantity);
    const data =await axios.get(`http://localhost:3000/user/${userName}`) 
     console.log(data)
      const values=data.data
      const email=values.email
    console.log(email)
    await axios.put(`http://localhost:3001/product/reducestock/${productId}`, { userquantity: quantity });
  
    var mailOptions = {
      from: 'branson59@ethereal.email',
      to: email,
      subject: 'Order summary',
      text: `Dear ${userName},
             Your order on product : ${productId} and quantity :${quantity} ,
             Thank's for ordering have a great day.`
    };
    
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    res.status(201).json(order);    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createOrder, getAllOrders, getOrderById };
