var imageModel = require('../model/image')
var fs = require('fs')
var mongoose = require('mongoose')
var url = require('url') 
var {goodsImg}=require('../untils/config')
var addImage= async(req,res,next)=>{ 
    var imgPath=[]
     
    for(var i=0;i<req.files.length;i++){
        var index=req.files[i].originalname.indexOf('.')
        var extention=req.files[i].originalname.substring(index)
        await fs.rename('public/uploads/goodsImg/'+req.files[i].filename,'public/uploads/goodsImg/'+req.files[i].filename+extention,
        err=>{
            if(err){console.log(err);}
         
        })
        var imgpath=url.resolve(goodsImg.baseURL,req.files[i].filename+extention)
       imgPath.push(imgpath)
    }
   var t= await save(req,imgPath)
   if(t){
        res.send({
            status:0,
        })
   }else{
       res.send({
           status:-1
       })
   }

}
var save=async(req,data)=>{
   var id= mongoose.Types.ObjectId()

   
    var result= await imageModel.save({imgUrl:data,indexImg:data[0],imgId:id})
 
    if(result){
        req.session.imgId=id
        
        return true 
    }else{
        return false;
    }
    // var sortId = await imageModel.find()

} 
var updateImageByImgId=async(req,res,next)=>{ 
    var imgPath=[]
     
    for(var i=0;i<req.files.length;i++){
        var index=req.files[i].originalname.indexOf('.')
        var extention=req.files[i].originalname.substring(index)
        await fs.rename('public/uploads/goodsImg/'+req.files[i].filename,'public/uploads/goodsImg/'+req.files[i].filename+extention,
        err=>{
            if(err){console.log(err);}
         
        })
        var imgpath=url.resolve(goodsImg.baseURL,req.files[i].filename+extention)
       imgPath.push(imgpath)
    }
    var imgId=req.session.updateImgId
    console.log(imgId)
   var t= await imageModel.updateImgByImgId({imgId:imgId,imgUrl:imgPath,indexImg:imgPath[0]})
   if(t){
        res.send({
            status:0,
        })
   }else{
       res.send({
           status:-1
       })
   }
}
module.exports={
    addImage,
    updateImageByImgId

}