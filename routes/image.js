var express = require('express');
var router = express.Router();
var imageControler=require('../controler/image.js')
var multer=require('multer')
var upload = multer({ dest: 'public/uploads/goodsImg' })

router.post('/uploadGoodImg',upload.array('file',10),imageControler.addImage)
router.post('/updateImage',upload.array('file',10),imageControler.updateImageByImgId)

module.exports=router