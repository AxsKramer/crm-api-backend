const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'This field is required']
  },
  price: {
    type: String,
    trim: true,
    required: [true, 'This field is required']
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: [true, 'This field is required'],
    trim: true
  }
});

module.exports = model('Product', productSchema);