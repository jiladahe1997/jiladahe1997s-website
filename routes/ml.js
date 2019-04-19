var express = require("express");
var router = express.Router();
var path = require("path");
var axios = require('axios')
var bodyParse = require("body-parser");

axios.defaults.proxy = { host: "127.0.0.1", port: 8888}
router.use(bodyParse.json());


router.get("/ml",function(req,res,next){
	var options = {
		root : path.dirname(__dirname)
	};
	res.sendFile("src/ml/ml.html",options);
	//res.sendFile("build/note1-1.md",options)
});

router.post('/ml/img_upload', async (req, res, next)=>{
 let axiosRes = await axios.post('http://localhost:8000/age_predict', {base64_img: req.body.base64_img})
 res.send(axiosRes.data)
})

module.exports = router;