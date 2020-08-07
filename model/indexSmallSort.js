var mongoose = require('mongoose')

var schema= new mongoose.Schema({
    smallSorts:[{smallSort:String}]
})

var smallSortModel=mongoose.model('indexSmallSort',schema)

var save=(data)=>{
    var model=new smallSortModel(data)
   return  model.save()
   .then((err)=>{
       console.log(err)
       return true
   })
   .catch(()=>{
       return false
   })
}

var updateSmallSort=(oldSort,newSort)=>{
    return smallSortModel.updateOne({'smallSorts.smallSort':oldSort},{$set:{'smallSorts.$.smallSort':newSort}})
   .then(()=>{
        return true
   })
   .catch(()=>{
       return false
   })
}

var getIndexSmallSort=()=>{
    return smallSortModel.find({})
}

module.exports={
    save,
    updateSmallSort,
    getIndexSmallSort
}