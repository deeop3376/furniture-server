var mongoose = require('mongoose')
var url = require('url')
var {Head}=require('../untils/config')
mongoose.set('useCreateIndex',true) //让下面的index生效

var UserSchema = new mongoose.Schema({
    username : {type: String },
    password : {type: String },
    email : {type: String},
    isAdmin:{type: Boolean , default:false},
    createDate:{type:Date,default:Date.now()},
    userHead:{type:String,default:url.resolve(Head.baseURL,'userhead.png')},
    shipping:[{name:String,address:String,phone:Number}]
})

var UserModel=mongoose.model('user',UserSchema)

var save=(data)=>{
    var user= new UserModel(data)
    return user.save()
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}

var getUser=(data)=>{
    return UserModel.findOne(data)
}

var findLogin = (data)=>{
    return UserModel.findOne(data)

}

var findPassword=(email,password)=>{
    return UserModel.updateOne({'email':email},{$set:{'password':password}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var addShipping=(data)=>{
    return UserModel.updateOne({'_id':data.userId},{$push:{'shipping':data.shipping}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}
var getShipping=(data)=>{
    return UserModel.findOne({'_id':data},{'shipping':1})
}
var getAllUser=()=>{
    return UserModel.find({},{"username":1,"email":1,"userHead":1,"createDate":1})
}
module.exports={
    findLogin,
    save,
    getUser,
    findPassword,
    addShipping,
    getShipping,
    getAllUser
}