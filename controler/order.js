const orderModel = require('../model/order')
const goodsModel = require('../model/goods')
var imageModel = require('../model/image')
var addOrder=async(req,res,next)=>{
    var {userId,goods,address} = req.body
    
    var goodInfo1=null
    var totalPrice=0
    for(let i=0;i<goods.length;i++){
        var goodInfo=await goodsModel.findGoodByGoodIdFromOrder(goods[i].goodId)
        goodInfo1=JSON.parse(JSON.stringify(goodInfo)) 
        if(goodInfo){
        //    var img= await imageModel.getImgByImgId(goodInfo.imgId)
        //    goodInfo1.indexImg=img.indexImg
        //    delete goodInfo1.imgId
        
        
             goods[i]=Object.assign(JSON.parse(JSON.stringify(goodInfo1)),JSON.parse(JSON.stringify(goods[i])))
             totalPrice=parseInt(goods[i].goodCount)*parseInt(goods[i].price)+totalPrice
        }
        
    }
       
    var result=await orderModel.save({userId,goods,address,totalPrice})
    // console.log(userId)
    // console.log(goods)
    // console.log(address)
    if(result){
        res.send({
            msg:'success',
            status:0,
            
        })
    }else{
        res.send({
            msg:'failed',
            status:-1
        })
    }
}

var findOrder=async(req,res,next)=>{ 
    var userId=req.query.userId
     var result= await orderModel.findOrderByUserId(userId) 
     if(result.length>0){
         console.log(result)
        //  var arr1=[]
        //  for(let i=0;i<result.length;i++){
        //      var arr=[]
             
        //         for(let j=0;j<result[i].goods.length;j++){
        //             var result1=await goodsModel.findGoodByGoodId(result[i].goods[j].goodId)
        //             result1.img1=result1.img[0].imgUrl
        //             console.log(result1.img1)
        //             arr.push(result1)
        //          }
        //          arr.push(result[i].isPay)  //result[i].isPay 是否付款标志 arr是该笔订单
              
            
        //      arr1.push(arr)  //arr1是该用户所有的订单 包括付款的和未付款的
        //  }
         res.send({ 
             msg:'find order success',
             status:0,
             data:result
         })
     }else{
         res.send({
             msg:'find null',
             status:-1,
             data:null
         })
     }
}

var deleteOrder=async(req,res,next)=>{
    var {orderId,userId}=req.body
    var result=await orderModel.deleteOrder(orderId,userId)
    if(result){
        res.send({
            msg:'delete success',
            status:0
        })
    }else{
        res.send({
            msg:'delete failed',
            status:-1
        })
    }
}
var findAllOrder=async(req,res,next)=>{ 
    var jumpindex=parseInt(req.query.index)
    var howmany=parseInt(req.query.howmany)
    var index=jumpindex*howmany;
    var length=await orderModel.getOrderLength()
    if(index>length){ 
        res.send({
            status:-1,
            msg:'pageSize is beyond'
        })
    }else if(index+howmany>length){
        howmany=length-index
    }
    var result= await orderModel.findAllOrder(index,howmany)
    if(result.length>0){
        res.send({
            status:0,
            data:result
        }) 
    }else{
        res.send({
            status:-1,
            msg:'get Order failed'
        })
    }
}


module.exports={
    addOrder,
    findOrder,
    deleteOrder,
    findAllOrder
}