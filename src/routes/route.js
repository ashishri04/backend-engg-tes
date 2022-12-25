const express = require('express')
const { customer , card } = require('../middleware/middleware')
const router = express.Router()


router.post('/customer', customer)
router.post('/card', card)

router.all('/*',(req,res)=>{return res.status(400).send({status:false,Message:"pls provide valid path"})})

module.exports = router

