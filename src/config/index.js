require('dotenv').config();

const config = {
  port =       process.env.PORT || 3000,
  dbName =     process.env.DB_NAME,
  dbPort =     process.env.DB_PORT,
  dbHost =     process.env.DB_HOST,
  secretWord = process.env.SECRET
};