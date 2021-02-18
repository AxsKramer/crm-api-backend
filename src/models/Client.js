const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    required: [true, "Company name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
  },
  state: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Client", clientSchema);
