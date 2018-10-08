var express = require ("express");
var app = express();
var expressWebSocket = require("express-ws")(app)
var index = require ("./routes/index.js");
var index_vue = require ("./routes/index_vue.js");
var login = require ("./routes/login.js");
var private = require("./routes/private.js")
var note = require ("./routes/note.js");
var resume = require("./routes/resume.js");
var ajax = require('./routes/ajax.js');
var websocket = require("./routes/websocket.js");
var compression = require("compression");
var morgan = require('morgan');
var fs = require("fs");
var path = require("path")


var cookieParser = require("cookie-parser");

app.use(compression())
var fileStream = fs.createWriteStream(path.join(__dirname,'access_log'),{flag:'a'})
app.use(morgan('combined',{stream:fileStream}))

app.use(express.static("build"));
app.use(cookieParser());

app.use(index);
app.use(index_vue);
app.use(login);
app.use(private)
app.use(note);
app.use(resume);
app.use(ajax);
app.use(websocket)

app.get('/',function(req,res){
	res.redirect("/index");
})
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("server listen on localhost 3000");
})