import ErrorResponse from "./interfaces/ErrorResponse";

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import errorHandler from './middlewares/errorHandler';

import indexRouter from './routes';
import usersRouter from './routes/users';

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
mongoose.connect(process.env.MONGO_DB!)
mongoose.connection.on('error', (error: Error) => console.log(error))

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
