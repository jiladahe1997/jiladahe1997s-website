var express = require("express");
var router = express.Router();
var path = require("path");


router.get("/index",function(req,res,next){
	var options = {
		root : path.dirname(__dirname)
	};
	res.sendFile("src/index/index.html",options);
	//res.sendFile("build/note1-1.md",options)
});
router.get("/index/redirect",(req,res)=>{
	res.redirect("http://192.168.0.1")
})

module.exports = router;