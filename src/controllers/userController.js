const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const config = require("../config");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({state: true});
    if(!users) return res.status(200).json({ok: false, message: "No users!" });
    res.status(200).json({ok: true, message: "Users found", users });
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error:error.message });
  }
  next();
}

const registerUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).json({ok: false, message: "This user already exists" });

  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);
  try {
    await newUser.save();
    res.status(201).json({ok: true, message: "User created correctly" });
    console.log(chalk.italic.blue("User created correctly"));
  } catch (error) {
    res.status(500).json({ok: false, message: "Internal Server Error", error: error.message });
    console.log(chalk.italic.red(error.message));
  }
  next();
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ok: false, message: "This user does not exist" });
    if(user.state === false) return res.status(404).json({ok: false, message: "You are not allowed access" });
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ mensaje: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      config.secretWord,
      { expiresIn: "8h" }
    );
    res.status(200).json({ok: true, token: token, message: "Logged in" });

  } catch (error) {
    res.status(500).json({ok: false, message: "Internal Server Error", error: error.message });
  }
  next();
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) return res.status(404).json({ ok: false, message: "User does not exist" });
    user.state = false;
    await user.save();
    res.status(200).json({ok: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ok: false, message: "Internal Server Error", error: error.message });
  }
  next();
}

module.exports = { getUsers, registerUser, loginUser, deleteUser };
