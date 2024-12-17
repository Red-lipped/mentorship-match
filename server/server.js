const express = require('express');
const app = express();
const PORT = 3000;

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
app.post('/', (req, res)=>{
    const {name} = req.body;
    
    res.status(201).json({message: `Welcome ${name}`});
})

// READ
app.get('/', (req, res) => {
    console.log('here')
    res.status(200).json({message:'GET request ran auccessfully.'});
})

// UPDATE
app.put('/update', (res, req) => {

})

// DELETE
app.delete('/delete', (res, req) => {

})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);