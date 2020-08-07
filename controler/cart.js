
const cartModel = require('../model/cart')
const goodsModel = require('../model/goods')
const imageModel = require('../model/image')

var addCart = async (req,res,next)=>{   
    var {userId,goodId,goodCount} = req.body
    
    var result=await cartModel.findCartByUserId(userId)//先判断用户是否有cart表

    if(result!=null){ //如果有
        var goodResult=await cartModel.findGoodIdByUserId({userId,goodId}) //再判断要添加的商品id，cart表中是否已经有了
        if(goodResult.length>0){  //如果有了，则只添加该商品的数量
                let a= await cartModel.updateGoodCountByUserIdAndGoodId(userId,goodId,goodCount)
                if(a){
                    res.send({
                        status:0,
                        msg:'add count success'
                    })
                }else{
                    res.send({
                        status:-1,
                        msg:'add count failed'
                    })
                }
        }else{  //如果没有，则添加该商品id，数量至goods数组中
            let b=await cartModel.addGoodsByUserId(userId,{goodId,goodCount})
            if(b){
                res.send({
                    status:0,
                    msg:'add count success'
                })
            }else{
                res.send({
                    status:-1,
                    msg:'add count failed'
                })
            }
        }
    }
    else{
        var goods=[]
    var obj={}
    obj.goodId=goodId
    obj.goodCount=goodCount
    goods.push(obj)
    
    var result=await cartModel.save({'goods':goods,'userId':userId})
    if(result){
        res.send({
            status:0,
            msg:'add cart success'
        })
    }else{
        res.send({
            status:-1,
            msg:'add cart failed'
        }) 
    }
    }
}

var findCart = async (req,res,next)=>{
    var userId= req.query.userId
    console.log('65---------------------------')
    // console.log(req.decode)
    var result=await cartModel.findCartByUserId(userId)
    // var result1=[] 
     var i=0

      console.log(result)
      var good1={}
    for(i=0;i<result.goods.length;i++){
      
       var good=await goodsModel.findGoodByGoodId(result.goods[i].goodId)
       good1=JSON.parse(JSON.stringify(good))
    //    var img= await imageModel.getImgByImgId(good.imgId)
    //     good1.indexImg=img.indexImg
 
    var obj1 = JSON.parse(JSON.stringify(result.goods[i]))
    var obj2 = JSON.parse(JSON.stringify(good1))

console.log(good)
    result.goods[i]=Object.assign(obj2,obj1)
    // console.log(result.goods[i])
    }
    // console.log(result)
    if(result){
        res.send({
            status:0, 
            msg:'get cart success',
            data:result
        })
    }else{ 
        res.send({ 
            status:-1,
            msg:'get cart failed',
            data:''
        })
    }
}

var deleteGoodByUserIdAndGoodId = async(req,res,next)=>{
    var {userId,goodId} = req.body
   var result= await cartModel.deleteGoodByUserIdAndGoodId(userId,goodId)
   console.log(result)
        if(result){
            res.send({
                status:0,
                msg:'delete success',
               
            })
        }else{
            res.send({
                status:-1,
                msg:'delete failed',
               
            })
        }
}
var test11=async ()=>{
    let goodId='5ecc81251db4461e7c1e03a8'
    var good=await goodsModel.findGoodByGoodId(goodId)
    console.log(good)
}
test11()
module.exports={
    addCart,
    findCart,
    deleteGoodByUserIdAndGoodId
}