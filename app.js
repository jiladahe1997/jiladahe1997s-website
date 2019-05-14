var process = require("process")
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
var ml = require("./routes/ml.js")
var compression = require("compression");
var morgan = require('morgan');
var fs = require("fs");
var path = require("path")


var cookieParser = require("cookie-parser");

// 启用webpack devmiddleware
var webpackDevMiddleware = require('webpack-dev-middleware')

if (process.env.NODE_ENV === 'production') {
  const webpackConfig = require('./webpack.prod.js')
  const webpack = require('webpack')
  const complier = webpack(webpackConfig)
  complier.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
  
    const info = stats.toJson();
  
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
  
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  })
} else{
  const webpackConfig = require('./webpack.dev.js')
  const webpack = require('webpack')
  const complier = webpack(webpackConfig)
  app.use(webpackDevMiddleware(complier, {
    publicPath: '/'
  }))
}

app.use(compression())
var fileStream = fs.createWriteStream(path.join(__dirname,'access_log'),{flag:'a'})
app.use(morgan('combined',{stream:fileStream}))

app.use(express.static("build"));
// app.use(express.static("src/ml"))
app.use(cookieParser());

app.use(index);
app.use(index_vue);
app.use(login);
app.use(private)
app.use(note);
app.use(resume);
app.use(ajax);
app.use(websocket);
app.use(ml);


app.get('/',function(req,res){
	res.redirect("/index");
})
let port = process.env.NODE_ENV === 'production' ? 3000 : 3000
var server = app.listen(port,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log(`server listen on localhost ${port}`);
})