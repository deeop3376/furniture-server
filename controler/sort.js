var sortModel = require('../model/sort')
var mongoose = require('mongoose') 
var addSort=async(req,res,next)=>{
    var {bigSort,smallSort}=req.body
    // var bSort=await sortModel.findSmallSortByBigSort(bigSort)
    // var sSort=await sortModel.isExistSmallSort(smallSort)
    // if(bSort.length>0&&sSort.length>0){
    //     var sortId=await sortModel.getSortIdBySmallSort(smallSort)
    //     if(sortId){
    //         req.session.sortId=sortId.sortId
    //         res.send({
    //             status:0
    //         })
    //     }else{
    //         res.send({
    //             status:-1
    //         })
    //     }
    // }else{
    //         var sortId=mongoose.Types.ObjectId()
    //         var result= await sortModel.save({bigSort,smallSort,sortId})
    //         if(result){
    //             req.session.sortId=sortId
    //             res.send({
    //                 status:0
    //             })
    //         }else{
    //             res.send({
    //                 status:-1
    //             })
    //         }
    // }
    var sortId=mongoose.Types.ObjectId()
            var result= await sortModel.save({bigSort,smallSort,sortId})
            if(result){
                
                res.send({
                    status:0
                })
            }else{
                res.send({
                    status:-1
                })
            }
}  
//----------------------------------------
var getBigSort=async(req,res,next)=>{
    var result= await sortModel.findBigSort()
    if(result.length>0){
        var temp=[]
        for(var i=0;i<result.length;i++){  //去重
            if(temp.indexOf(result[i].bigSort)==-1){
                temp.push(result[i].bigSort)
            }
        }
        res.send({
            status:0, 
            data:temp  //data形如['客厅']
        })
    }else{
        res.send({
            status:-1
        })
    }
  
}
 //------------------------------------
var getSmallSortByBigSort=async(req,res,next)=>{  
    var bigSort=req.query.bigSort
    
    var result=await sortModel.findSmallSortByBigSort(bigSort)
    if(result.length>0){
        res.send({
            status:0,
            data:result         //返回的格式是这样的[{_id:'dfad2343sf',isIndex:false,smallSort:'电视柜'}]
        })
    }else{
        res.send({
            status:-1,

        })
    }
   
}
//-----------------------------------------------
var getIndexSmallSort=async (req,res,next)=>{
    var result=await sortModel.findIndexSmallSort() 
    // var result1=[]
    // for(var i=0;i<result.length;i++){
    //     for(var j=0;j<result[i].sorts.smallSorts.length;j++){
    //         if(result[i].sorts.smallSorts[j].isIndex===true){
    //             result1.push(result[i].sorts.smallSorts[j])
    //         }
    //     }
       
    // }
    if(result.length>0){
        res.send({
            data:result,  //[{smallSort,_id}]
            status:0
        })
    }else{
        res.send({
            status:-1
        })
    }
}
var getSortIdBySmallSort=async(req,res,next)=>{
    var sortId= await sortModel.getSortIdBySmallSort(req.query.smallSort)
    if(sortId){
        res.send({ 
            status:0,
            data:sortId
        })
    }else{
        res.send({
            status:-1,
            msg:'get sortId failed'
        })
    }
}
var getAllSmallSort=async (req,res,next)=>{
   var result= await sortModel.getAllSmallSort()
   if(result.length>0){
        res.send({ 
            status:0,
            data:result
        })
    }else{
            res.send({
                status:-1,
                msg:'get sortId failed'
            })
        }
}

module.exports={
    addSort,
    getSmallSortByBigSort,
    getBigSort,
    getIndexSmallSort,
    getSortIdBySmallSort,
    getAllSmallSort
}