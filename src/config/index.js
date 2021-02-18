require('dotenv').config();

const config = {
  port:       process.env.PORT || 3000,
  dbName:     process.env.DB_NAME,
  dbUser:     process.env.DB_USER,
  dbPass:     process.env.DB_PASSWORD,
  dbHost:     process.env.DB_HOST,
  secretWord: process.env.SECRET
};

module.exports = config;