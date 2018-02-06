var express = require ("express");
var app = express();
var index = require ("./routes/index.js");
var login = require ("./routes/login.js");
var note = require ("./routes/note.js");
//var manage_note = require ("./routes/manage_note.js");
var note_detail = require ("./routes/note_detail.js");
var manage = require ("./routes/manage.js");
var cookieParser = require("cookie-parser");

app.use(express.static("build"));
app.use(cookieParser());

app.use(index);
app.use(login);
app.use(note);
//app.use(manage_note);
app.use(note_detail);
app.use(manage);

app.get('/',function(req,res){
	res.redirect("/index");
})
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("server listen on localhost 3000");
})