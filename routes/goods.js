var express = require('express');
var router = express.Router();
var goodsControler=require('../controler/goods.js')
var multer=require('multer')
var upload = multer({ dest: 'public/uploads/goodsImg' })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addGoods',goodsControler.addGoods)
// router.get('/bigSort',goodsControler.findBigSort)
// router.get('/smallSort',goodsControler.findSmallSort)
router.get('/findGoodsBySmallSort',goodsControler.findGoodsBySmallSort)
router.get('/test',goodsControler.test)
router.get('/getGood',goodsControler.findGoodByGoodId)
router.post('/getGood1',goodsControler.findGoodFromOrder)
router.get('/getIndexGoods',goodsControler.getIndexSmallSortGoods)
router.get('/getGoodByPagination',goodsControler.findGoodByPagination)
router.get('/getGoodsLength',goodsControler.getGoodsLength)


router.post('/uploadTest', upload.array('file',10),goodsControler.uploadTest)
router.post('/updateGood',goodsControler.updateGoodCharacter)

router.post('/deleteGood',goodsControler.deleteGoodByGoodId)
router.get('/getGoodsLengthBySmallSort',goodsControler.getGoodsLengthBySmallSort)
router.get('/searchGood',goodsControler.searchGood)
router.get('/searchGoodLength',goodsControler.searchGoodLength)
module.exports = router;
  