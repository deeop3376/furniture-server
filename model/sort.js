var mongoose = require('mongoose')

var sortSchema=new mongoose.Schema({
    bigSort:{type:String},
    smallSort:{type:String},
    isIndex:{type:Boolean,default:false},
    sortId:String,
    saleCount:{type:Number,default:0}
})

var sortModel= mongoose.model('sort',sortSchema)

var save=(data)=>{
    var sort=new sortModel(data)
    return sort.save()
    .then(()=>{
        return true
    })
    .catch(()=>{ 
        return false
    }) 
}


//------------------------------------------------
 var findBigSort=()=>{
     return sortModel.find({},{'bigSort':1})
 }
 //--------------------------------------------
 var findSmallSortByBigSort=(data)=>{
    return sortModel.find({'bigSort':data},{'smallSort':1,'isIndex':1,'sortId':1})
}
//------------------------------------
 var findIndexSmallSort=()=>{
    return sortModel.find({'isIndex':true},{'smallSort':1,'sortId':1})
//     return sortModel.aggregate([{'$unwind':'$sorts'},
//       {'$match':{'sorts.smallSorts.isIndex':true}},
//     //  {'$unwind':'$sorts.smallSorts'},
//     //  {'$match':{'sorts.smallSorts.isIndex':true}},
//        {'$project':{'sorts.smallSorts':1}}
    
// ])
    //  return  sortModel.find({})
 }
 //------------------------------------
var isExistSmallSort=(data)=>{
    return sortModel.find({'smallSort':data})
}
var getSortIdBySmallSort=(data)=>{
    return sortModel.findOne({'smallSort':data},{'sortId':1})
}
var getAllSmallSort=()=>{
    return sortModel.find({},{'smallSort':1})
}
module.exports={
    save,
    findSmallSortByBigSort,
    findBigSort,
    findIndexSmallSort,
    isExistSmallSort,
    getSortIdBySmallSort,
    getAllSmallSort
}