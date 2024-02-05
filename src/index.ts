import ErrorResponse from "./interfaces/ErrorResponse";

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

import errorHandler from './middlewares/errorHandler';

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();

dotenv.config();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    credentials: true
}));
app.use(cookieParser());

// database connections
mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_DB)
mongoose.connection.on('error', (error: Error) => console.log(error))

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
