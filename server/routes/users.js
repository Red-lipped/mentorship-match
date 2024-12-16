const express = require("express")
const router = express.Router()

router.get('/', (req,res) => {
    res.status(200).json({message: 'user list'})
})

router.get('/new', (req,res) => {
    res.status(200).json({message: 'new user form'})
})

module.exports = router