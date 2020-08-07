var express = require('express')
var router = express.Router()
var orderController = require('../controler/order')

router.post('/addOrder',orderController.addOrder)
router.get('/getOrder',orderController.findOrder)
router.get('/getAllOrder',orderController.findAllOrder)
module.exports=router
