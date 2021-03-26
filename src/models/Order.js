const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  order: [{
    product: {
      type: Schema.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
  }],
  user:{
    type: Schema.ObjectId,
    ref: 'User',
  },
  total: {
    type: Number
  },
  state:{
    type: Boolean,
    default: true
  },
  
},{ timestamps: { createdAt: 'created_at' } });

module.exports = model('Order', orderSchema);