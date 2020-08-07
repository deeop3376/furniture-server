var Mongoose = require('mongoose')

let cartSchema = new Mongoose.Schema({
    goods:[{goodId:String,goodCount:Number,isChecked:{type:Boolean,default:false}}],   
    userId:String
})
var cartModel=Mongoose.model('cart',cartSchema)

var save=(data)=>{
    var cart=new cartModel(data)
    return cart.save()
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false 
    })
}

var findCartByUserId=(userId)=>{
    return cartModel.findOne({'userId':userId})
}

var addGoodsByUserId=(userId,goods)=>{
    return cartModel.updateOne({'userId':userId},{$push:{'goods':goods}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var updateGoodCountByUserIdAndGoodId=(userId,goodId,goodCount)=>{
   return cartModel.update({'userId':userId,'goods.goodId':goodId},{$inc:{'goods.$.goodCount':goodCount} } )
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var findGoodIdByUserId=(data)=>{
   return cartModel.find({'userId':data.userId,'goods.goodId':data.goodId})
}

var deleteGoodByUserIdAndGoodId=(userId,goodId)=>{
    return cartModel.updateOne({'userId':userId},{$pull:{'goods':{'goodId':goodId}}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
module.exports={
    save,
    findCartByUserId,
    addGoodsByUserId,
    updateGoodCountByUserIdAndGoodId,
    findGoodIdByUserId,
    deleteGoodByUserIdAndGoodId
}
