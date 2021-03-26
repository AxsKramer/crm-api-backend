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
    trim: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required']
  },
  role:{
    type: String,
    default: 'user'
  },
  state: {
    type: Boolean,
    default: true
  }
});

userSchema.methods.toJSON = function() {
  const {__v, password, state, ...user} = this.toObject();
  return user;
}

module.exports = model('User', userSchema);