var express = require("express")
var router = express.Router()
var path = require("path")


var option = {
    root:path.dirname(__dirname)
};


router.get("/private",function(req,res){
    res.sendFile("src/private/private.html",option)
})
router.get("/private_vue",function(req,res){
    res.sendFile("src/private_vue/private_vue.html",option)
})


router.get("/private/:itemName",function(req,res){
    res.sendFile("src/private/private_all.html",option)
})

router.get("/test",function(req,res){
    res.sendFile("build/fengsaolvshi.mp4",option)
})

module.exports = router
