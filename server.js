var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var Pool =  require('pg').Pool;

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

//Database config
var config = {
  host: 'localhost',
  user: 'postgres',
  password: 'swathi',
  database: 'my_app',
  port:'5432'
};
var pool = new Pool(config);
// app.get('/', function (req, res) {
//   console.log(path.join(__dirname, 'ui'));
//   res.sendFile(path.join(__dirname, 'ui'));
// });

var response = {};
app.use(express.static(path.join(__dirname,'ui')));
//User registration and login
app.post('/api/v1/login',function(req,res){
  let email = req.body.email;
  let password = req.body.password;
  pool.query('SELECT * FROM testapp.user where email=$1',[email],function(err,result){
    if(err){
      response.statusCode = "400";
      response.message = "failed";
      response.data = {
        "login":false,
        "message":"User Does not exist"
      }
      res.send(JSON.stringify(response));
    }else{
      console.log(result.rows[0].email);
      if(result.rows[0].password == password){
        response.statusCode = "200";
        response.message = "success";
        response.data = {"login":true}
        res.send(JSON.stringify(response));
      }else{
        response.statusCode = "400";
        response.message = "success";
        response.data = {"login":false,"message":"Incorrect password"}
        res.send(JSON.stringify(response));
      }
    }
  })
});
app.post('/api/v1/register',function(req,res){
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  pool.query('insert into testapp.user values($1,$2,$3)',[name,email,password],function(err,result){
    if (err){
      response.statusCode = "400";
      response.message = "failed";
      response.data = {"register":false}
      res.send(JSON.stringify(response));
    }else{
      response.statusCode = "200";
      response.message = "success";
      response.data = {"register":true}
      res.send(JSON.stringify(response));
    }
  });
});
//Article API's
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
