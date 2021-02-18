const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('User', userSchema);