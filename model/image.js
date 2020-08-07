var mongoose = require('mongoose')

var imageSchema=new mongoose.Schema({
    imgUrl:[String],
    indexImg:{type:String,default:'aaaaaa'},
    imgId:String,
})

var imageModel = mongoose.model('image',imageSchema)
var save=(data)=>{
    var model= new imageModel(data)
    return model.save()
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false 
    })
}
var getImgByImgId=(data)=>{
    return imageModel.findOne({'imgId':data})
} 
var updateImgByImgId=(data)=>{
    return imageModel.updateOne({'imgId':data.imgId},{$set:{'imgUrl':data.imgUrl,'indexImg':data.indexImg}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}

module.exports={
    save,
    getImgByImgId,
    updateImgByImgId
}
