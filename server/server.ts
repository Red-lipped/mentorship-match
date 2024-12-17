const express = require('express');
const app = express();
const PORT = 3000;
import  { Request, Response, NextFunction } from 'express';
import { ServerError } from './types.ts';

// importing dotenv files
// This allows us to use our API keys in the .env files
import dotenv from "dotenv";
dotenv.config();

// allows parsing of json responses
app.use(express.json());

// importing a router
const userRouter = require('./routes/users.js')
app.use('/users', userRouter)

// CREATE
app.post('/', (req: Request, res:Response)=>{
    const {name} = req.body;

    res.status(201).json({message: `Welcome ${name}`});
})

// READ
app.get('/', (req:Request, res:Response) => {
    console.log('here')
    res.status(200).json({message:'GET request ran auccessfully.'});
})

// UPDATE
app.put('/update', (res:Response, req:Request) => {

})

// DELETE
app.delete('/delete', (res:Response, req:Request) => {

})


// global error handler
app.use('/', (err: ServerError, req: Request, res:Response, _next: NextFunction): void => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    // & We add the type of ServerError to our errorObj
    const errorObj: ServerError = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  })

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);