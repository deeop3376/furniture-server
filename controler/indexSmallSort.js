var smallSortModel=require('../model/indexSmallSort')

var addIndexSmallSort=async(req,res,next)=>{
    // var {indexSmallSort}=req.body
    var indexSmallSort=[{smallSort:'书桌'},{smallSort:'沙发'},{smallSort:'电视柜'},{smallSort:'床'},{smallSort:'椅子'},
    {smallSort:'柜子'}]
    var result= await smallSortModel.save({'smallSorts':indexSmallSort})
    if(result){
        res.send({
            msg:'add smallSort success',
            status:0
        })
    }else{
        res.send({
            msg:'add smallSort failed',
            status:-1
        })
    }
}

var updateIndexSmallSort=async(req,res,next)=>{
    var {oldSort,newSort}=req.body
    console.log(oldSort,newSort)
    var result=await smallSortModel.updateSmallSort(oldSort,newSort)
 
    console.log(result)
    if(result){
        res.send({
            msg:'update smallSort success',
            status:0
        })
    }else{
        res.send({
            msg:'update smallSort failed',
            status:-1
        })
    }
}

var getIndexSmallSort=async(req,res,next)=>{
    var result=await smallSortModel.getIndexSmallSort() //返回的是一个数组
    console.log(result)
    result=result[0].smallSorts
    if(result.length>0){ //如果查询到值，则数组length>0
        res.send({
            msg:'get success',
            data:result,
            status:0
        })
    }else{
        res.send({
            msg:'get failed',
            
            status:-1
        })
    }
}

module.exports={
    addIndexSmallSort,
    updateIndexSmallSort,
    getIndexSmallSort
}