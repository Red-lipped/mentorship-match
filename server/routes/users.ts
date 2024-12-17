const express = require("express")
const router = express.Router()
import { Request, Response, NextFunction } from 'express';

// import the Schema so we can manipulate


router.get('/', (req: Request,res:Response) => {
    res.status(200).json({message: 'user list'})
})

// we need to encrypt our password to create a new user
router.post('/new', (req: Request,res:Response) => {
    res.status(200).json({message: 'new user form'})
})

//
router.put('/update', (req:Request, res:Response)=>{

})

module.exports = router