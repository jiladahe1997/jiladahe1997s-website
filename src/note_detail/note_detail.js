import "./note_detail.html";
import "./note_detail.css";
require ("expose-loader?$!./jquery-3.2.1.min");

var url = window.location.href+"/ajax";
//console.log("解析当前url，向服务器发送相应编号的笔记请求");
//console.log("当前路径(url):",url);
//此处为正则表达式，第一次匹配/note/123 第二次再匹配123 注意+(重复一次或多次)不能用*(重复0次或多次)替代
//console.log("解析后结果:",url.match(/(\/note\/.*)/i)[0].match(/\d+/));

$.get(url,function(data){
	console.log("ajax返回数据：",data);
	$(".container").html(data.note);
	//$(".title p").html(data[0].title);
	//$(".write-time p").html(data[0].writetime.substr(0,10));
	//$(".note pre").html(data[0].note);
})

