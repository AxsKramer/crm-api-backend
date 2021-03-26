const Product =require('../models/Product');
const path = require('path');
const multer = require('multer');
const shortid = require('shortid');

const multerConf = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    }else{
      cb(new Error('Invalid format'));
    }
  }
}

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({state: true});
    res.status(200).json({ok: true, message: 'Products listed', products});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById({_id: req.params.productId});
    if(!product) return res.status(404).json({ok: false, message: `${req.params.productId} does not exist` })
    res.status(200).json({ok: true, message: 'Product found', product});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

const upload = multer(multerConf).single('image');

const uploadFile = (req, res, next) => {
  upload(req, res, error => {
    if(error) {
      res.status(500).json({ok: false, message: 'File could not be upload', error: error.message});
    }
    next();
  })
}

const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    if(req.file.filename){
      newProduct.image = req.file.filename;
    }
    await newProduct.save();
    res.status(201).json({ok: true, message: 'Product created'});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

const searchProduct = async (req, res, next) => {
  try {
    const product = await Product.find({name: new RegExp(req.params.query, 'i')});
    res.status(200).json({ok: true, message: 'Product found', product});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

const updateProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    if(req.file){
      newProduct.image = req.file.filename;
    }else{
      const previousProduct = await Product.findById(req.params.productId);
      newProduct.image = previousProduct.image;
    }
    await Product.findOneAndUpdate({_id: req.params.productId}, newProduct, {new: true, runValidators: true});
    res.status(200).json({ok: true, message: 'Product updated'});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

const deleteProduct = async (req, res,  next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) res.status(404).json({ ok: false, message: "Product does not exist" });
    product.state = false;
    await product.save();
    res.status(200).json({ok: true, message: "Product deleted"});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
  }
  next();
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
  uploadFile
}