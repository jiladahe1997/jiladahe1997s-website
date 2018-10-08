var express = require("express");
var router = express.Router();
//var websocket  = require("express-ws")(router);

var startTime = get_time()

router.ws("/websocket/server_time",function(ws,req){
    ws.on("message",function(message){
        //console.log(message);
        ws.send(JSON.stringify({
            startTime : startTime,
            nowTime : get_time()
        }))
    })
})


function get_time(){
    const monthTable = ["Jan",'Feb',"Mar",'Apr',"May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const dayTable = ["Mon","Tue","Wen","Thu","Fri","Sat","Sun"]

    var a = new Date();
    a= a.toString();
    var year = /\b\d{4}\b/
    var month = /\bJan\b|\bFeb\b|\bMar\b|\bApr\b|\bMay\b|\bJun\b|\bJul\b|\bAug\b|\bSep\b|\bOct\b|\bNov\b|\bDec\b/
    var date = /\b\d{1,2}\b/
    var time = /\b\d{2}:\d{2}:\d{2}\b/
    var day = /\bMon\b|\bTue\b|\bWen\b|\bThu\b|\bFri\b|\bSat\b|\bSun\b|/
  
    year = a.match(year);
    month = monthTable.indexOf(a.match(month)[0]) + 1 ;
    date = a.match(date);
    time = a.match(time)
    day = (dayTable.indexOf(a.match(day)[0]) +1);
  
    return year+'年'+month+"月"+date+"日"+" "+time+" "+"星期"+day
}
  
module.exports = router
