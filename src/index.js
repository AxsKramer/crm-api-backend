const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const dbConnection = require('./db');
const {port} = require('./config');
const { userRouter, clientRouter, productRouter, orderRouter, trashRouter} = require('./routes');

dbConnection();
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: true,
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'uploads')));

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/trash', trashRouter);

app.listen(port, () => console.log(chalk.italic.cyan(`Server running in ${port}`)));
