const mongoose = require('mongoose')

var orderSchema=new mongoose.Schema({
    userId:String,
    goods:[{goodId:String,goodCount:Number,price:Number,name:String,indexImg:String}],
    totalPrice:Number,
    createDate:{type:Date,default:Date.now()},
    address:String,
    isPay:{type:Boolean,default:false},
    isFinished:{type:Boolean,default:false},
    isSendGood:{type:Boolean,default:false},
    isCancel:{type:Boolean,default:false}
})

var orderModel=mongoose.model('order',orderSchema)

var save=(data)=>{ 
    
    var order=new orderModel(data)
    return order.save()
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}

var deleteOrder=(orderId,userId)=>{
return orderModel.remove({'_id':orderId,'userId':userId})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
} 

var findOrderByUserId=(userId)=>{
    return orderModel.find({'userId':userId})
}

var findAllOrder=(index,howmany)=>{
    return orderModel.find({}).skip(index).limit(howmany)
}
var getOrderLength=()=>{
    return orderModel.find({}).count()
}
module.exports={
    save,
    deleteOrder,
    findOrderByUserId,
    findAllOrder,
    getOrderLength
}