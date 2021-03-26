const Client = require('../models/Client');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');


const getAllDeletedItems = async (req, res, next) => {

  try {
    const clients = await Client.find({state: false}) || [];
    const users = await User.find({state: false}) || [];
    const orders = await Order.find({state: false}) || [];
    const products = await Product.find({state: false}) || [];
    const deletedItems = { clients, users, orders, products  }
    res.status(200).json({ok: true, message: 'Items deleted', deletedItems});
    
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
} 

module.exports ={
  getAllDeletedItems
}