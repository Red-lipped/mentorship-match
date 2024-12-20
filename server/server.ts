import express from "express";
import { Request, Response, NextFunction } from 'express';
import {ServerError} from './types.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 8080;

// importing dotenv files
// This allows us to use our API/URI keys in the .env files
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

//allow cors to allow all origins
app.use(cors());
// allows parsing of json responses
app.use(express.json());

// add connection to MongoDB Atlas
const MONGOURL = process.env.MONGOURL;
// console.log(MONGOURL);

mongoose
  .connect(MONGOURL)
  .then(() => console.log('Connected to MongoDB successfully! '))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// importing a router
import userRouter from './routes/users.js'
app.use('/users', userRouter);

// Serve all static files in our public folder
app.use(express.static('../public/*'));


// Global Error Handler
app.use(
  '/',
  (
    err: ServerError,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    // & We add the type of ServerError to our errorObj
    const errorObj: ServerError = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  }
);

// App listening event
app.listen(PORT, () => {
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
});
