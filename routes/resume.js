var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/resume",(req,res)=>{
    var option = {
        root : path.dirname(__dirname)
    }
    res.sendFile("build/resume.html",option);
})

module.exports = router;