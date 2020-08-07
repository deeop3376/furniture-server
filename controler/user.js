var { Email } = require('../untils/config.js')
var UserModel = require('../model/user.js')
var {setCrypto} = require('../untils/base.js')
var svgCaptcha = require('svg-captcha');
var jwt = require('jsonwebtoken')
var fs=require('fs')
var path=require('path')
var  login = async (req,res,next)=>{
    var { username,password,imgVerify } = req.body
    var result = await UserModel.findLogin({
        username, 
        password:setCrypto(password)
    })
    
    if(result && imgVerify==req.session.verifyImg){
        req.session.username=username 
         let userId=result._id
         let token=jwt.sign({username,userId},'thy',{expiresIn:60*60*24})
        res.send({
            token:token,
            msg:'登录成功',
            status:0
        })
        return;
    }else if(imgVerify==req.session.verifyImg){
        res.send({
            msg:'帐号或密码错误',
            status:-1
        })
    }else if(result){
        res.send({
            msg:'验证码错误',
            status:-2
        })
    }else{
        res.send({
            msg:'帐号或密码he验证码错误',
            status:-3
        })
    }
}

var  register = async (req,res,next)=>{
    var { username,password,email,verify }=req.body
    var isUsername = await UserModel.findLogin({username})
    if(isUsername){
        res.send({
            msg:'昵称已被占用',
            status:-3
        })
        return;
    }
    if(verify!==req.session.verify || email!==req.session.email){
        res.send({
            msg:'验证码或邮箱错误',
            status:-1
        })
        return;
    }
    
    var result = await UserModel.save({
        username,
        password:setCrypto(password),
        email
    })

    if(result){
        res.send({
            msg:'注册成功',
            status:0
        })
    }else{
        res.send({
            msg:'注册失败',
            status:-2
        })
    }
}

var  verify = async (req,res,next)=>{
    var email = req.query.email
    var result= await UserModel.findLogin({email})
    if(result){
        res.send({
            msg:'该邮箱已被注册',
            status:-2
        })
        
    }else{
    var verify=Email.verify
    req.session.email=email
    req.session.verify=verify
    var mailOptions = {
        from:'毕设商店 1819322077@qq.com',
        to: email,
        subject: '这是一个验证码',
        text: '验证码是：'+ verify
    }
  
     Email.transporter.sendMail(mailOptions,(err)=>{
        if(err){
            res.send({
                msg:'发送失败',
                status:-1
            })
        }else{
            
            res.send({
                msg:'验证码发送成功',
                status:0
            })
        }
    })
}
    
}

var  logout = async (req,res,next)=>{
    req.session.username=''
    res.send({
        msg:'退出成功',
        status:0
    })
}

var  getUser = async (req,res,next)=>{

    if(req.session.username){
        // var result = await UserModel.findLogin({
        //     username:'aa',
        //     password:'111'
        // })
        var result = await UserModel.getUser({username:req.session.username})
        // var userhead=result[0].userhead
    //    console.log(userhead)
        res.send({
            msg:'获取用户成功',
            status:0,
            data:{
                username:req.session.username,
                userId:result._id,
                email:result.email,
                createDate:result.createDate
            }
        })
    }else{
        res.send({
            msg:'用户未登录',
            status:-1
        })
    }
}

var  findPassword = async (req,res,next)=>{
    var { email,password,verify}=req.body
    if(email===req.session.email && verify===req.session.verify){
        var result = await UserModel.findPassword(email,setCrypto(password))
        if(result){
           res.send({
            msg:'修改密码成功',
            status:0
           })
        }else{
            res.send({
                msg:'修改密码失败',
                status:-1
               })
        }
    }else{
        res.send({
            msg:'验证失败',
            status:-2
        })
    }
}
var getVerifyImg= async (req, res, next)=>{
    var captcha = svgCaptcha.create({
            // 翻转颜色    
            inverse: false,    
            // 字体大小    
            fontSize: 36,   
             // 噪声线条数    
             noise: 2,   
              // 宽度    
              width: 80,    
              // 高度    
              height: 30,    
            });   
            // 保存到session,忽略大小写
               req.session.verifyImg = captcha.text.toLowerCase();
                 // console.log(req.session.verifyImg)
                  //0xtg 生成的验证码 
                   //保存到cookie 方便前端调用验证 
                  // res.cookie('captcha', req.session);  
                    res.setHeader('Content-Type', 'image/svg+xml'); 
                     res.write(String(captcha.data));  res.end(); 
}
var addShipping=async(req,res,next)=>{
    var {shipping,userId}=req.body
    
    var result=await UserModel.addShipping({shipping,userId})
    
    if(result){
        res.send({
            status:0,
            msg:'添加收货信息成功' 
        })
    }else{
        res.send({
            status:-1,
            msg:'添加收货信息失败'
        })
    }
}
var getCity=async(req,res,next)=>{
    fs.readFile(path.resolve(__dirname,"city.json"), 'utf8', function (err, data) {
        
        var obj = JSON.parse(data)
        res.send(obj)
      });

}
var getShipping=async(req,res,next)=>{
    var userId=req.query.userId
    var result=await UserModel.getShipping(userId)
    
    if(result.shipping.length>0){
        res.send({
            status:0,
            data:result.shipping
        })
    }else{
        res.send({
            status:-1,
            
        })
    }
}
let getAllUser = async(req,res,next)=>{
    var result=await UserModel.getAllUser()
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
module.exports={
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    getVerifyImg,
    addShipping,
    getShipping,
    getCity,
    getAllUser
}
