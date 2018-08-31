var express = require('express');
var router = express.Router();
var path = require("path");
var mysql = require("mysql");


router.get("/ajax/private_items",function(req,res){
    //check权限 
    //检查cookie
    var connection =mysql.createConnection({
		host : "120.78.151.148",
		user : "root",
		password : "Freedom1997",
		database : "App"
	});
	connection.connect(function(err){
		//if any err occured , during connecting
    });
    connection.query("SELECT * FROM private_Items",null,function(error,results,fields){
		if(error){
			console.log("err occured! ",error);
		}

		console.log("results :",results);
		//console.log("fields",fields);

        {
            let data = {}
            for(let i=0;i<results.length;i++){
                data[results[i].item_Name] = {
                    name : results[i].item_Name,
                    text : results[i].item_text
                }
            }
            results = data
        }
        res.send(results)
	});
 
	connection.end();
    //连接数据库

})



var startTime = get_time()

router.get("/ajax/server_time",function(req,res){
    let nowTime = get_time()
    res.json({
        startTime : startTime,
        nowTime : nowTime,
    })
})


function get_time(){
    const monthTable = ["Jan",'Feb',"Mar",'Apr',"May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const dayTable = ["Mon","Thu","Wen","Thu","Fri","Sat","Sun"]

    var a = new Date();
    a= a.toString();
    var year = /\b\d{4}\b/
    var month = /\bJan\b|\bFeb\b|\bMar\b|\bApr\b|\bMay\b|\bJun\b|\bJul\b|\bAug\b|\bSep\b|\bOct\b|\bNov\b|\bDec\b/
    var date = /\b\d{1,2}\b/
    var time = /\b\d{2}:\d{2}:\d{2}\b/
    var day = /\bMon\b|\bThu\b|\bWen\b|\bThu\b|\bFri\b|\bSat\b|\bSun\b|/
  
    year = a.match(year);
    month = monthTable.indexOf(a.match(month)[0]) + 1 ;
    date = a.match(date);
    time = a.match(time)
    day = (dayTable.indexOf(a.match(day)[0]) +1);
  
    return year+'年'+month+"月"+date+"日"+" "+time+" "+"星期"+day
}
  

module.exports = router