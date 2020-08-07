var express =require('express')
var sortController=require('../controler/sort')

var router=express.Router()

router.post('/addSort',sortController.addSort)
router.get('/getBigSort',sortController.getBigSort)
router.get('/getSmallSort',sortController.getSmallSortByBigSort)
router.get('/getIndexSmallSort',sortController.getIndexSmallSort)
router.get('/getSortIdBySmallSort',sortController.getSortIdBySmallSort)
router.get('/getAllSmallSort',sortController.getAllSmallSort)
module.exports=router