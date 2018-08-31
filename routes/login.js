var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParse = require("body-parser");
var mysql = require("mysql");






router.use(bodyParse.urlencoded());


var options = {
	root:path.dirname(__dirname)
};
router.get('/login',function(req,res,next){
	var connection =mysql.createConnection({
		host : "120.78.151.148",
		user : "root",
		password : "Freedom1997",
		database : "App"
	});
	connection.connect(function(err){
		//if any err occured , during connecting
	});
	connection.query("SELECT username,password FROM user_Basic_info WHERE username= ? ",[req.cookies.login ? req.cookies.login[0] : ""],function(error,results,fields){
		if(error){
			console.log("err occured! ",error);
		}
		//console.log(typeof(results[0].password),results[0].password);
		//console.log(typeof(req.body.password))
		//console.log("results :",typeof(results),results[0].username);
		//console.log("fields",fields);
		if(results.length!=0 && results[0].password == req.cookies.login[1]){
			//res.cookie("login",[req.body.username,req.cookies.login[1]]);
			res.redirect("/private")
		}
		else{
			res.sendFile("src/login/login.html",options);
		}
	});
 
	connection.end();
	//是否带cookie
	console.log(req.cookies);
	

})


router.post('/login',function(req,res,next){
	/*调试信息*/
	console.log('post data :',req.body);
	//console.log(typeof(req.body["re-password"]));

	/*开始检查用户信息数据库*/
	var connection =mysql.createConnection({
		host : "120.78.151.148",
		user : "root",
		password : "Freedom1997",
		database : "App"
	});

	connection.connect(function(err){
		//if any err occured , during connecting
	});
	connection.query("SELECT username,password FROM user_Basic_info WHERE username= ? ",[req.body.username],function(error,results,fields){
		if(error){
			console.log("err occured! ",error);
		}
		//console.log(typeof(results[0].password),results[0].password);
		//console.log(typeof(req.body.password))
		//console.log("results :",typeof(results),results[0].username);
		//console.log("fields",fields);
		if(results.length!=0 && results[0].password == req.body.password){
			res.cookie("login",[req.body.username,req.body.password]);
			res.send("login success!");
		}
		else{
			res.send("login failed!");
		}
	});
 
	connection.end();

})

module.exports = router;  