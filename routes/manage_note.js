var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");


var postDataparser = bodyParser.urlencoded();


 

router.get("/manage/note",function(req,res,next){
	var option = {
		root : path.dirname(__dirname),
	}
	res.sendFile("src/manage_note/manage_note.html",option);
});


router.post("/manage/note",postDataparser,function(req,res,next){
	var connection = mysql.createConnection({
	host : "120.78.151.148",
	user : "root",
	password : "Freedom1997",
	database : "App",
	})

	connection.connect(function(err){
		if(err){
			console.log(err);
		}
	});
	console.log(req.body);
	connection.query("INSERT INTO note(title,writetime,note) VALUES ( ? , CURRENT_DATE() , ? )",[req.body.title , req.body.brief],function(err,results,fields){
		if(err){
			console.log(err);
		}
		console.log(results);
		console.log(fields);
	});
});

module.exports = router ; 