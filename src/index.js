const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');
const userRouter = require('./routes/userRouter');
const clientRouter = require('./routes/clientRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const dbConnection = require('./db');
const {port} = require('./config');

dbConnection();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '/src/uploads')));

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => console.log(chalk.italic.cyan(`Server running at http://localhost:${port}`)));
