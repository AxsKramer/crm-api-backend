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
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    }else{
      cb(new Error('Invalid format'));
    }
  }
}

const upload = multer(multerConf).single('image');

const uploadFile = (req, res, next) => {
  upload(req, res, (error) => {
    if(error) return res.status(500).json({ok: false, messgae: 'File could not be upload', error: error.message});
    return next();
  })
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({state: true});
    res.status(200).json({ok: true, message: 'Products listed', products});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Products could not be listed', error: error.message});
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById({_id: req.params.productId});
    if(!product){
      res.status(404).json({ok: false, message: `${req.params.productId} does not exist` })
    }
    res.status(200).json({ok: true, message: 'Product found', product});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Products could not be found', error: error.message});
  }
}

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    if(req.file.filename){
      newProduct.image = req.file.filename;
    }
    await newProduct.save();
    res.status(201).json({ok: true, message: 'Product created', product: newProduct});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Products could not be created', error: error.message});
  }
}

const searchProduct = async (req, res) => {
  try {
    const product = await Product.find({name: new RegExp(req.params.query, 'i')});
    res.status(200).json({ok: true, message: 'Product found', product});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Products could not be found', error: error.message});
  }
}

const updateProduct = async (req, res) => {
  try {
    let newProduct = req.body;

    if(req.file){
      newProduct.image = req.file.filename;
    }else{
      const previousProduct = await Product.findById(req.params.productId);
      newProduct.image = previousProduct.image;
    }

    let product = await Product.findOneAndUpdate({_id: req.params.productId}, newProduct, {new: true, runValidators: true});
    res.status(200).json({ok: true, message: 'Product updated', product});
  } catch (error) {
    res.status(500).json({ok: true, message: 'Product could not be updated', error: error.message});
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) res.status(404).json({ ok: false, message: "Product does not exist" });
    product.state = false;
    await product.save();
    res.status(200).json({ok: true, message: "The product was hidden, it is not possible to deleted permanently", product});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Product could not be deleted', error: error.message});
  }
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