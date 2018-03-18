var express = require ("express");
var app = express();
var index = require ("./routes/index.js");
var index_vue = require ("./routes/index_vue.js");
var login = require ("./routes/login.js");
var note = require ("./routes/note.js");
var resume = require("./routes/resume.js");
var ajax = require('./routes/ajax.js');

var cookieParser = require("cookie-parser");

app.use(express.static("build"));
app.use(cookieParser());

app.use(index);
app.use(index_vue);
app.use(login);
app.use(note);
app.use(resume);
app.use(ajax);


app.get('/',function(req,res){
	res.redirect("/index");
})
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("server listen on localhost 3000");
})