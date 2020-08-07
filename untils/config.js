var mongoose = require('mongoose')
var nodemailer = require('nodemailer')

var Email = {
	config:{
		host:'smtp.qq.com',
		port:587,
		auth:{
			user:'1819322077@qq.com',
			pass:'lqhwpybtfzrreihb'
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config)
	},
	get verify(){
		return Math.random().toString().substring(2,6)
	}
}

var Mongoose = {
	url:'mongodb://localhost:27017/bysj1',
	connect(){
		mongoose.connect(this.url,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
			if(err){
				console.log('数据库链接失败')
				return;
			}
			console.log('数据库链接成功')
		})
	}
} 

var Head = {
	baseURL :'http://212.64.36.196:80/uploads/headImg/'
}
var goodsImg={
	baseURL:'http://212.64.36.196:80/uploads/goodsImg/'
}
module.exports={
	Mongoose,
	Email,
	Head,
	goodsImg
}