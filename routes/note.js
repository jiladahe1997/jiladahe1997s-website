var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");

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
	var filePath = path.dirname(__dirname) + "/src/note/README.md";
	console.log("文件路径：",filePath);
	fs.readFile(filePath,"utf-8",(err,data)=>{
		if(err){
			console.log("读取笔记README文件错误，请联系管理员检查！",err);
			res.json({data:"读取笔记README文件错误，请联系管理员检查！"});
			return
		}
		res.json({data:data});
	})
});

module.exports = router;

