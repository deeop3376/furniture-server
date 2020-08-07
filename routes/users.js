var express = require('express');
var router = express.Router();
var userControler=require('../controler/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userControler.login)
router.post('/register',userControler.register)
router.get('/verify',userControler.verify)
router.get('/logout',userControler.logout)
router.get('/getUser',userControler.getUser)
router.post('/findPassword',userControler.findPassword)

router.get('/getVerifyImg',userControler.getVerifyImg)
router.post('/addShipping',userControler.addShipping)
router.get('/getShipping',userControler.getShipping)
router.get('/getCity',userControler.getCity)
router.get('/getAllUser',userControler.getAllUser)
module.exports = router;
