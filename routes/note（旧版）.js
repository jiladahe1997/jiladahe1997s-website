var express = require("express");
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

//本页面首次将html文件使用webpack一起打包（index和login都只打包了js和css）,因此sendFile的路径不一样
//见（webpack打包html文件并处理其中的img标签）
router.get("/note",function(req,res,next){
	var option = {
		root : path.dirname(__dirname),
	}
	//本页面首次将html文件使用webpack一起打包，因此路径不同
	res.sendFile("build/note.html",option);
})

router.get("/note/webdev",function(req,res,next){
	//res.json({title:"ajax测试",writetime:"2017-11-25",mem:"ajax测试，未包含数据库查询"});
	var connection = mysql.createConnection({
	host : "120.78.151.148",
	user : "root",
	password : "Freedom1997",
	database : "App",
	})

	var temp_results;
	connection.connect(function(err){
		if(err){
			console.log(err)
		}
	});

	console.log("ajax数据测试：count",req.query);
	connection.query("SELECT * FROM note ORDER BY 'id' LIMIT ? , ?",[Number(req.query.count)-5,Number(req.query.count)],function(err,results,fields){
		if(err){
			console.log(err)
		}
		temp_results=results;
		//console.log("回调顺序测试：1");
		res.json(results);
	});
	//console.log("回调顺序测试：2");
	connection.end();

});

module.exports = router;

