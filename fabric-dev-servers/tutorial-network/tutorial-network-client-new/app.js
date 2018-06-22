var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression')

var port = process.env.PORT || 3000;
// var ipaddr = 'localhost';

app.use(compression());
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsin

app.use("/src",express.static(__dirname + '/src'));
app.use("/",express.static(__dirname + '/dist'));

// app.use(function(req,res,next){
//     console.log(req,res);
//     var hello = req.url.split('.');
//     if(hello[hello.length-1]=='js'){
//         console.log(req,res);
//         req.url += '.gz';
//         res.set('Content-Encoding', 'gzip');
//     }
// console.log(req,res);
//     next();
// });

// app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/dist/technovation/index.html');
});

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   console.log(req,res);
//   next();
// });

app.listen(port, function() {
    console.log("listening on port " + port);
});