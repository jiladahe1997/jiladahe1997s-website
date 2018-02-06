import "./note.css";
import "./note-background.jpg"
import "./title.jpg"
import "./note_bg.jpg"
require ("./note.html");
require ("expose-loader?$!./jquery-3.2.1.min");
var showdown = require("./showdown.js");

var httpRequest = new XMLHttpRequest();

httpRequest.open("get","note/webdev",true);
httpRequest.onreadystatechange = ()=>{
	if(httpRequest.readyState === XMLHttpRequest.DONE){
		var data = JSON.parse(httpRequest.response);
		var converter = new showdown.Converter();
		var markedText = converter.makeHtml(data.data);
		console.log(markedText);
		var webdev = document.getElementsByClassName("webdev")[0];
		webdev.insertAdjacentHTML('afterbegin',markedText);
	}
}
httpRequest.send();



