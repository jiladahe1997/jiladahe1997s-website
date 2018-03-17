var express = require("express");
var router = express.Router();
var path = require("path");


router.get("/index-vue",function(req,res,next){
	var options = {
		root : path.dirname(__dirname)
	};
	res.sendFile("build/index_vue.html",options);
	//res.sendFile("build/note1-1.md",options)
});

module.exports = router;