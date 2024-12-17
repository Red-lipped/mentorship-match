const express = require('express');
const app = express();
const PORT = 3000;
import { Request, Response, NextFunction } from 'express';
import { ServerError } from './types.js';
import mongoose from 'mongoose';
import cors from 'cors';

// importing dotenv files
// This allows us to use our API/URI keys in the .env files
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

//allow cors to allow all origins
app.use(cors());
// allows parsing of json responses
app.use(express.json());

// add connection to MongoDB Atlas
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log('Connected to MongoDB successfully! '))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// importing a router
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

// CREATE
app.post('/', (req: Request, res: Response):void => {
  const { name } = req.body;

  res.status(201).json({ message: `Welcome ${name}` });
});

// READ
app.get('/', (req: Request, res: Response):void => {
  console.log('here');
  res.status(200).json({ message: 'GET request ran successfully.' });
});

// UPDATE
app.put('/update', (res: Response, req: Request):void => {});

// DELETE
app.delete('/delete', (res: Response, req: Request):void => {});

// global error handler
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

app.listen(PORT, (error:ServerError):void => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
