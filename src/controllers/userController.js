const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const chalk = require("chalk");
const config = require("../config");


const registerUser = async (req, res) => {

  const user = await User.findOne({email: req.body.email});

  if(user) return res.status(400).json({message: 'This user already exists'});

  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);
  try {
    await newUser.save();
    res.status(201).json({message: 'User created correctly'});
    console.log(chalk.italic.blue('User created correctly'));
  } catch (error) {
    res.status(500).json({message: 'There was an error when registering the user'});
    console.log(chalk.italic.red(error.message));
  } 
}

const loginUser = async (req, res) => {
  const {email, password } = req.body;
  const user = await User.findOne({email});

  if(!user){
    res.status(404).json({message: 'This user does not exist'});
    next();
  }else{
    if(!bcrypt.compareSync(password, user.password)){
      res.status(401).json({ mensaje : 'Incorrect password'});
      next();
    }else{
      const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
      }, config.secretWord,{expiresIn: '1h'});

      res.status(200).json({token: token, message: 'OK'});
    }
  }
}

module.exports = {registerUser, loginUser};