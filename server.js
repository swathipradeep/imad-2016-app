var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser')

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   console.log(path.join(__dirname, 'ui'));
//   res.sendFile(path.join(__dirname, 'ui'));
// });
var response;
app.use(express.static(path.join(__dirname,'ui')));
app.get('/api/v1/article/:id',function(req,res){
  console.log(req.params);
  res.send("Hello");
});
app.post('/api/v1/article/comment/:id',function(req,res){

});
app.get('/api/v1/aboutme',function(req,res){

});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
