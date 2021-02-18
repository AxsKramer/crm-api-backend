const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../config');

const mongooseConf = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}

const MONGOOSE_URI  = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
const dbConnection = async () => {
  try{
    await mongoose.connect(MONGOOSE_URI, mongooseConf);
    console.log(chalk.bold.bgBlue('Database connected'.toUpperCase()));
  }
  catch(error){
    console.log(error.message);
  } 
}

module.exports = dbConnection;