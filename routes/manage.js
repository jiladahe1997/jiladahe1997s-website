var express = require("express");
var router = express.Router();
var path  = require("path");
var mysql = require("mysql");
var cookieParser = require("cookie-parser");

router.use(cookieParser());
//18.2.6暂时注释这段，这段会导致登录所有页面都会被拦截检查cookie，影响调试。
/*router.use(function(req,res,next){
	console.log("COOKIE分析：",req.cookies,req.signedCookies);
	console.log(Object.getOwnPropertyNames(req.cookies));
	if(Object.getOwnPropertyNames(req.cookies).length != 0){
		next();
	}
	else{
		res.redirect("/login");
	}
})*/

router.get("/manage/ajax",function(req,res,next){
	var connection = mysql.createConnection({
		host : "120.78.151.148",
		user : "root",
		password : "Freedom1997",
		database : "App",
	})

	connection.connect(function(err){
		if(err) console.log(err);
	})

	connection.query("SELECT * FROM note",function(err,result){
		console.log(result);
		res.json(result);
	})
})

router.get("/manage",function(req,res,next){
	var option = {
		root : path.dirname(__dirname),
	}
	res.sendFile("build/manage.html",option);
})

module.exports = router ; 