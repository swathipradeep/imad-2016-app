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
  host: 'db.imad.hasura-app.io',
  user: 'swathipradeep',
  password: process.env.DB_PASSWORD,
  database: 'swathipradeep',
  port:'5432'
};
var appSecret = "1234sddff4DDffffK";
var pool = new Pool(config);
// app.get('/', function (req, res) {
//   console.log(path.join(__dirname, 'ui'));
//   res.sendFile(path.join(__dirname, 'ui'));
// });

var response = {};
app.use(express.static(path.join(__dirname,'ui')));
//User registration and login
app.post('/api/v1/login',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  pool.query('SELECT * FROM public.users where email=$1',[email],function(err,result){
    if(err){
      response.statusCode = "400";
      response.message = "failed";
      response.data = {
        "login":false,
        "message":"User Does not exist"
      }
      res.send(JSON.stringify(response));
    }else{
      if(result.rows[0].password == password){
        //JWT implementation
        // console.log(result.rows[0]);
        // var token = jwt.sign(result.rows[0],appSecret, {
        //     expiresIn : 1440 // expires in 24 hours
        // });
        response.statusCode = "200";
        response.message = "success";
        response.data = {"login":true,'token':result.rows[0].email,info:result.rows[0].email}
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
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  pool.query('insert into public.users("email","password","name") values ($1,$2,$3)',[email,password,name],function(err,result){
    if (err){
        console.log(err);
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
app.get('/api/v1/article',function(req,res){
  pool.query("select public.article.article_id, public.article.title, public.article.content, public.article.created_date_time, public.users.name from public.article inner join public.users on public.article.created_by = public.users.email",function(err,result){
    if(err){
      console.log(err);
      response.statusCode = "400";
      response.message = "failed";
      response.data = {"message":"Something went wrong please try again."}
      res.send(JSON.stringify(response));
    }else{
      response.statusCode = "200";
      response.message = "success";
      response.data = {"articles":result.rows}
      res.send(JSON.stringify(response));
    }
  });

});
//Article API's
app.get('/api/v1/article/:id',function(req,res){
  var id= req.params.id;
  pool.query("select * from public.article where article_id=$1",[id],function(err,result){
    if(err){
      response.statusCode = "400";
      response.message = "failed";
      response.data = {"message":"Something went wrong please try again."}
      res.send(JSON.stringify(response));
    }else{
      pool.query("select * from public.comments where article_id=$1",[id],function(err,re){
        if(err){

        }else{
          response.statusCode = "200";
          response.message = "success";
          response.data = {"articles":result.rows,"comments":re.rows}
          res.send(JSON.stringify(response));
        }
      });

    }
  });

});
app.use(function verifyToken(req,res,next)
{
  var token = req.headers.cookie;
  var result = email.split("=");
  var email = res[1];
  //var email = req.cookies['token'];
  // jwt.verify(token, appSecret, function(err, decoded) {
  //    if (err) {
  //      response.statusCode = "400";
  //      response.message = "failed to authenticate";
  //      response.data = {"loggedin":false}
  //      res.send(JSON.stringify(response));
  //    } else {
  //      // if everything is good, save to request for use in other routes
  //      var decoded_token = decoded;
  //      req.body.email = decoded_token.email
  //      next();
  //    }
  //  });
  pool.query('SELECT * FROM public.users where email=$1',[email,function(err,result){
    if(err){
      response.statusCode = "400";
      response.message = "failed";
      response.data = {
        "login":false,
        "message":"User Does not exist"
      }
      res.send(JSON.stringify(response));
    }else{
        req.body.email = email
        next();
    }
  }]);
});
app.get('/api/v1/verifyuser',function(req,res){
  if(req.body.email){
    response.statusCode = "200";
    response.message = "success";
    response.data = {"loggedin":true}
    res.send(JSON.stringify(response));
  }else{
    response.statusCode = "200";
    response.message = "success";
    response.data = {"loggedin":false}
    res.send(JSON.stringify(response));
  }
});
app.post('/api/v1/article/comment',function(req,res){
  var email = req.body.email;
  console.log(email);
  var comment= req.body.comment;
  var a_id = req.body.article_id;
  pool.query('insert into public.comments ("article_id","comment","created_by") values ($1,$2,$3)',[a_id,comment,email],function(err,result){
    if(err){
      console.log(err);
      response.statusCode = "400";
      response.message = "failed";
      response.data = {"message":"Something went wrong please try again."}
      res.send(JSON.stringify(response));
    }else{
      response.statusCode = "200";
      response.message = "success";
      response.data = {"comment":result}
      res.send(JSON.stringify(response));
    }
  })
});
app.post('/api/v1/article',function(req,res){
  var email = req.body.email;
  var title = req.body.title;
  var content = req.body.content;
  var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  pool.query('insert into public.article ("created_by","title","created_date_time","content") values ($1,$2,$3,$4)',[email,title,date,content],function(err,result){
    if(err){
        console.log(err);
      response.statusCode = "400";
      response.message = "failed";
      response.data = {"message":"Something went wrong please try again."}
      res.send(JSON.stringify(response));
    }else{
      response.statusCode = "200";
      response.message = "success";
      response.data = {"article":"saved"}
      res.send(JSON.stringify(response));
    }
  })
});

app.get('/api/v1/aboutme',function(req,res){

});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
