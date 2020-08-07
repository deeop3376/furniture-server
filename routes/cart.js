var express = require('express')
var router = express.Router()
var cartController = require('../controler/cart')
// let jwt = require('jsonwebtoken')

router.get('/getCart',cartController.findCart)
router.post('/addCart',cartController.addCart)
router.post('/deleteGood',cartController.deleteGoodByUserIdAndGoodId)

module.exports=router