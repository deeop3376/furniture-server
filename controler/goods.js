var goodsModel = require('../model/goods.js')
 var fs = require('fs')
 var url = require('url') 
var {goodsImg}=require('../untils/config')
 var sortModel=require('../model/sort')
 var imageModel=require('../model/image')
// var {v1} = require('uuid')
//fen zhi test
var addGoods= async (req,res,next)=>{
    var {name,desc,count,price,sortId,guige} = req.body
    // var imgId=req.session.imgId
    // var sortId=req.session.sortId
     count=parseInt(count)
     price=parseInt(price)
      
    var result= await goodsModel.save({name,desc,count,price,sortId,guige})
    
    if(result){ 
        req.session.goodId=result
        res.send({
            msg:'成功',  
            status:0,
            data:result
        })
    }else{
        res.send({
            msg:'失败',
            status:-1 
        })
    }
}

var uploadTest=async(req,res,next)=>{
  
    var imgPath=[]
     console.log(req.files)
    for(var i=0;i<req.files.length;i++){
        var index=req.files[i].originalname.indexOf('.')
        var extention=req.files[i].originalname.substring(index)
        await fs.rename('public/uploads/goodsImg/'+req.files[i].filename,'public/uploads/goodsImg/'+req.files[i].filename+extention,
        err=>{
            if(err){console.log(err);}        
        })
        var imgpath=url.resolve(goodsImg.baseURL,req.files[i].filename+extention)
        console.log(imgpath)
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
var save=async(req,imgPath)=>{
    var id=req.session.goodId   
     var result= await goodsModel.saveImg({img:imgPath,indexImg:imgPath[0],goodId:id})
  console.log(result)
     if(result){
        
         
         return true
     }else{ 
         return false;
     }
     // var sortId = await imageModel.find()
  
 } 

// var findBigSort= async (req,res,next)=>{
//     var result= await goodsModel.findBigSort()
    
//     if(result){
//         res.send({
//             status:0,
//             data:result
//         })
//     }else{
//         res.send({
//             status:-1,
//             msg:'error'
//         })
//     }
// }

// var findSmallSort=async (req,res,next)=>{
//     var bigSort=req.query.bigSort
//     var smallSort= await goodsModel.findSmallSort(bigSort)
//     if(smallSort){
//         res.send({
//             status:0,
//             data:smallSort
//         })
//     }else{
//         res.send({
//             status:-1,
//             msg:'查询不到'
//         })
//     }
// }
//------------------------------------------------
var findGoodsBySmallSort=async(req,res,next)=>{ //先从sort表中获取sortId，再在goods表中以sortId查找good
    var jumpindex=parseInt(req.query.index)
    var howmany=parseInt(req.query.howmany)
    var index=jumpindex*howmany;
    var length=await goodsModel.getGoodsLength()
    if(index>length){
        res.send({
            status:-1,
            msg:'pageSize is beyond' 
        })
    }else if(index+howmany>length){
        howmany=length-index
    }
    var smallSort=req.query.smallSort 
    var sort=await sortModel.getSortIdBySmallSort(smallSort) //获取smallSort对应的sortId形如：{_id,sortId}
    console.log(sort)
    var sortId=sort.sortId
    
    var goodsList= await goodsModel.findGoodsBySortId(sortId,index,howmany) //根据sortId获取goods
    var goodslist=JSON.parse(JSON.stringify(goodsList))
    console.log('128----------')
    console.log(goodslist)
    if(goodsList.length>0){ //获取的goods是个数组 空数组判断为true在if中，所以用length判断
        // for(var i=0;i<goodsList.length;i++){ //将indexImg加入goodslist中
        //     var img=await imageModel.getImgByImgId(goodsList[i].imgId)
        //     if(img){
        //         var indexImg=img.indexImg
        //     goodslist[i].indexImg=indexImg
        //     }
        // }
       
        res.send({
            status:0,
            data:goodslist
        })
    }else{
        res.send({
            status:-1,
            msg:'查询商品失败'
        }) 
    }
}
var getGoodsLengthBySmallSort=async(req,res,next)=>{
    console.log(req.query.smallSort)
    var sort=await sortModel.getSortIdBySmallSort(req.query.smallSort)
    
    var sortId=sort.sortId
    
    if(sortId!=null){
        
        var length=await goodsModel.getGoodsLengthBySmallSort(sortId)
        console.log('158---'+length)
        if(length>0){
            res.send({
                status:0,
                data:length
            })
        }else{
            res.send({
                status:-1,
                
            })
        }
    }
    


}
//-------------------------------------
var test=async(req,res,next)=>{
    // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/');

    var result=await goodsModel.findGoodsByIsHot()
    
    if(result.length>0){
        res.send({
            status:0,
            data:result
        })
    }
}

//----------------------------------------------
var findGoodByGoodId=async(req,res,next)=>{
    var goodId=req.query.goodId
    var result=await goodsModel.findGoodByGoodId(goodId)
    
    var result1=JSON.parse(JSON.stringify(result))
    if(result){
    //    var img=await imageModel.getImgByImgId(result.imgId)
    //    result1.indexImg=img.indexImg
    //    result1.imgUrl=img.imgUrl
     
        res.send({ 
            status:0,
            data:result1 //{good信息,indexImg,imgUrl:['imgurl','imgurl']}
        })
    }else{
        res.send({
            status:-1,
            msg:'没有获取到'
        })
    }
}

var findGoodFromOrder=async(req,res,next)=>{  //接受order页面传过来的goodId数组
    var {goods} =req.body   //goods形如：[{goodId:'2222',goodCount:2},{...}]
    var arr=[]
    // var goods=goods1.goods
    
    var result1={}
    for(let i=0;i<goods.length;i++){
        console.log(goods[i].goodId)
       var result= await goodsModel.findGoodByGoodId(goods[i].goodId)  //查询返回的是对象
       result1=JSON.parse(JSON.stringify(result))
        // var img= await imageModel.getImgByImgId(result.imgId)
        // result1.indexImg=img.indexImg
        result1.goodCount=goods[i].goodCount
       if(JSON.stringify(result1)!="{}"){  //如果对象不为空
           arr.push(result1)  //将对象放入数组
       } 
    }
    // console.log(arr)
    if(arr.length>0){   //如果数组不为空
        res.send({
            msg:'order success',
            status:0,
            data:arr   //将数组返回
        })
    }else{
        res.send({
            msg:'order failed',
            status:-1,
           
        })
    }
 
}
//------------------------------------------------------
var getIndexSmallSortGoods= async(req,res,next)=>{
    var sortId=req.query.sortId
    
    var result=await goodsModel.findIndexSmallSortGoods(sortId)
    var result1=JSON.parse(JSON.stringify(result))
    if(result.length>0){
        // for(var i=0;i<result.length;i++){
        //     var img= await imageModel.getImgByImgId(result[i].imgId)
        //     result1[i].indexImg=img.indexImg
        // }
        res.send({
            status:0,
            data:result1  //形如：[good信息,_id,indexImg]
        })
    }else{
        res.send({
            status:-1,
            
        })
    }
}
//-------------------------------------------------
var findGoodByPagination= async(req,res,next)=>{
    var jumpindex=parseInt(req.query.index)
    var howmany=parseInt(req.query.howmany)
    var index=jumpindex*howmany;
    var length=await goodsModel.getGoodsLength()
    if(index>length){
        res.send({
            status:-1,
            msg:'pageSize is beyond'
        })
    }else if(index+howmany>length){
        howmany=length-index
    }
    var result= await goodsModel.findGoodByPagination(index,howmany)
    var result1=JSON.parse(JSON.stringify(result))
    if(result.length>0){
        // for(var i=0;i<result.length;i++){
        //    var img= await imageModel.getImgByImgId(result[i].imgId)
        //    result1[i].indexImg=img.indexImg
        //    result1[i].img=img.imgUrl
        // }
        res.send({
            status:0,
            data:result1 //[{good信息，indexImg,img}]
        })
    }
}
//----------------------------------------------
var getGoodsLength=async (req,res,next)=>{
    var length= await goodsModel.getGoodsLength()
    res.send({
        status:0,
        data:length
    })
} 

var updateGoodCharacter=async (req,res,next)=>{
    var {name,desc,count,price,sortId,imgId,goodId} = req.body
    req.session.updateImgId=imgId
    
     count=parseInt(count)
     price=parseInt(price) 
      
    var result= await goodsModel.updateGoodCharacter({name,desc,count,price,sortId,goodId})
    
    if(result){ 
        res.send({
            msg:'成功', 
            status:0
        })
    }else{
        res.send({
            msg:'失败',
            status:-1
        })
    }
}

var deleteGoodByGoodId= async(req,res,next)=>{
    var {goodId}=req.body
    var result= await goodsModel.deleteGood(goodId)
    if(result){
        res.send({
            status:0,

        })
    }else{
        res.send({
            status:-1,
            msg:'delete failed'
        })
    }
}
var searchGood =async(req,res,next)=>{
    let searchGood=req.query.searchGood
    var jumpindex=parseInt(req.query.index)
    var howmany=parseInt(req.query.howmany)
    var index=jumpindex*howmany;
    var length=await goodsModel.getGoodsLength()
    if(index>length){
        res.send({
            status:-1,
            msg:'pageSize is beyond'
        })
    }else if(index+howmany>length){
        howmany=length-index
    }
    let result=await goodsModel.searchGood(searchGood,index,howmany)
    if(result.length>0){
        res.send({
            status:0,
            data:result
        })
    }else{
        res.send({
            status:-1,
        })
    }
}
var searchGoodLength=async (req,res)=>{
    let searchGood=req.query.searchGood
    let length= await goodsModel.searchGoodLength(searchGood)
    res.send({
        status:0,
        data:length
    })
}
module.exports={
    addGoods,
    // findBigSort,
    // findSmallSort,
    findGoodsBySmallSort,
    test,
    uploadTest,
    findGoodByGoodId,
    findGoodFromOrder,
    getIndexSmallSortGoods,
    findGoodByPagination,
    getGoodsLength,
    updateGoodCharacter,
    deleteGoodByGoodId,
    getGoodsLengthBySmallSort,
    searchGood,
    searchGoodLength
}