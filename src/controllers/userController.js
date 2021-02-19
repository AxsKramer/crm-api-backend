const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const config = require("../config");

const registerUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user){
    res.status(400).json({ok: false, message: "This user already exists" });
    next();
  }

  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);
  try {
    await newUser.save();
    res.status(201).json({ok: true, message: "User created correctly" });
    console.log(chalk.italic.blue("User created correctly"));
  } catch (error) {
    res.status(500).json({ok: false, message: "There was an error when registering the user", error: error.message });
    console.log(chalk.italic.red(error.message));
    next();
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "This user does not exist" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ mensaje: "Incorrect password" });
      next();
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        config.secretWord,
        { expiresIn: "1h" }
      );

      res.status(200).json({ok: true, token: token, message: "Logged in" });
    }
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete({_id: req.params.userId});
  console.log(user, 'User deleted');
}

module.exports = { registerUser, loginUser, deleteUser };
