var mongoose = require('mongoose')
var goodsSchema = new mongoose.Schema({
    name : {type: String },
    desc : {type: String },
    count : {type: Number },
    price : {type: Number },
    isHot:{type:Boolean,default:false},
    isIndex:{type:Boolean,default:false},
    addDate:{type:Date,default:Date.now()},
    sortId:{type:String},
    // imgId:{type:String}
    img:[String],
    indexImg:{type:String},
    isSale:{type:Boolean,default:true},
    saleCount:{type:Number,default:0},
    guige:{type:String,index:true}
})
var goodsModel = mongoose.model('goods',goodsSchema) //user是表名

var save=(data)=>{  //创建记录
    var goods = new goodsModel(data)
    
    return goods.save()
        .then(()=>{

            return goods.get("_id")  //创建成功 返回商品id
        })
        .catch((err)=>{ 
            
            return false  //创建失败 返回false
        }) 
}

// var findBigSort=()=>{
//     return goodsModel.find({},{bigSort:1})
// }
// var findSmallSort=(data)=>{
//     return goodsModel.find({bigSort:data},{smallSort:1})
// }
//-------------------------------
var findGoodsBySortId=(data,index,howmany)=>{
    return goodsModel.find({'sortId':data}).skip(index).limit(howmany)
}
//----------------------

var findGoodsByIsHot=()=>{
    return goodsModel.find({'isHot':true})
}
var findGoodByGoodId=(goodId)=>{
    return goodsModel.findOne({'_id':goodId})
}
var findGoodByGoodIdFromOrder=(goodId)=>{ //订单表只需要goodName goodImg price
    return goodsModel.findOne({'_id':goodId},{'name':1,'price':1,'indexImg':1})
}
var findIndexSmallSortGoods=(sortId)=>{
    return goodsModel.find({'sortId':sortId,'isIndex':true})
}
var findGoodByPagination=(index,howmany)=>{
    return goodsModel.find({}).skip(index).limit(howmany) 
}
var getGoodsLength=()=>{
    return goodsModel.find({}).count()
}
var getGoodsLengthBySmallSort=(data)=>{
    return goodsModel.find({'sortId':data}).count()
}
var updateGoodCharacter=(data)=>{
    return goodsModel.updateOne({'_id':data.goodId},{$set:{'name':data.name,'desc':data.desc,'count':data.count,
    'price':data.price,'sortId':data.sortId}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
} 

var deleteGood=(data)=>{
    return goodsModel.deleteOne({'_id':data})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var saveImg=(data)=>{
    return goodsModel.updateOne({'_id':data.goodId},{$set:{'img':data.img,'indexImg':data.indexImg}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var searchGood=(data,index,howmany)=>{
    return goodsModel.find({'guige':{$regex:data+''}}).skip(index).limit(howmany)
}
var searchGoodLength=(data)=>{
    return goodsModel.find({'guige':{$regex:data+''}}).count()
}

// goodsModel.find({},function(err,articles){

// articles.forEach(function(article){
//     for(var j = 0;j<article.img.length;j++){
//         console.log('105-----------')
//         console.log(article.img.length)
//             if(article.img[j].indexOf('localhost')!=-1){
//                 var a=article.img[j]+''
//                 console.log('107---------------')
//                 console.log(typeof a)
//                  article.img[j] = a.replace('localhost','212.64.36.196')
                 
//                  article.markModified('img')
//                  article.save()
//              }
//      } 
//     })
// })
//---------------------------------------
//    articles.forEach(function(article){
//            if(article.indexImg.indexOf('localhost')!=-1){
//                var aa=article.indexImg
//                article.indexImg=aa.replace('localhost','212.64.36.196')
//                article.save()
//            }
//     })


module.exports={
    save,    
    findGoodsBySortId,
    findGoodsByIsHot,
    findGoodByGoodId,
    findIndexSmallSortGoods,
    findGoodByGoodIdFromOrder,
    findGoodByPagination,
    getGoodsLength,
    updateGoodCharacter,
    deleteGood,
    saveImg,
    getGoodsLengthBySmallSort,
    searchGood,
    searchGoodLength
}