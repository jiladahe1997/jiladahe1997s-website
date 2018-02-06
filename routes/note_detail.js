var express = require("express");
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var fs = require("fs");
var showdown = require("showdown");

router.get("/note/:note_num",function(req,res,next){
	var option = {
		root : path.dirname(__dirname),
	};
	res.sendFile("./build/note_detail.html",option);
})


router.get("/note/:note_num/ajax",function(req,res,netx){
	//连接数据库查找数据
	/*var connection = mysql.createConnection({
		host : "120.78.151.148",
		user : "root",
		password : "Freedom1997",
		database : "App",
	})
	connection.connect();
	connection.query("SELECT * FROM note WHERE id = ?",[req.params.note_num],function(error,results,fields){
		if(error){
			throw error;
		}
		res.json(results)
	})*/
	filePath = "./build/" + req.params.note_num + ".md"  //参数格式应该为note1-1、note1-2、note2-1 这样
	fs.readFile(filePath,"utf-8",function(err,data){
		if(err) {
			res.json({note:"笔记不存在！请联系管理员"})
			console.log(err);
			return 
		};
		console.log(data);
		converter = new showdown.Converter();
		data = converter.makeHtml(data);
		console.log(data);
		res.json({note:data});
	})
	
})

module.exports=router;