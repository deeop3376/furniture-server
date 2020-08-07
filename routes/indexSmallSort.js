var express = require('express')
var router = express.Router()
var smallSortController = require('../controler/indexSmallSort')

router.get('/getIndexSmallSort',smallSortController.getIndexSmallSort)
router.get('/addIndexSmallSort',smallSortController.addIndexSmallSort)
router.post('/updateIndexSmallSort',smallSortController.updateIndexSmallSort)

module.exports=router