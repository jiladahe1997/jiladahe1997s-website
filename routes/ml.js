var express = require("express");
var router = express.Router();
var path = require("path");


router.get("/ml",function(req,res,next){
	var options = {
		root : path.dirname(__dirname)
	};
	res.sendFile("src/ml/ml.html",options);
	//res.sendFile("build/note1-1.md",options)
});

module.exports = router;