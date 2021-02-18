const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {

  const authHeader = req.get('Authorization');

  if(authHeader){
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let checkToken;
  try {
    checkToken = jwt.verify(token, config.secretWord);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if(!checkToken){
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  next();
}

module.exports = auth;