'use strict';

var express = require('express'),
posts = require('./mock/posts.json'),
baseurl=require('./baseurl.js');
// mock folder to see how the data is being use

var downloadlink = './src/mock/download.txt';

var app = express(),
admin = express(),
secret = express();

// jade templates we need 2 configurations. firstly we need jade view engine in our application. secondly we define the views parameter which takes the direction to the file to view.
app.set('view engine','jade');
app.set('views',__dirname+'/templates');


// Once set, the value of app.locals properties persist throughout the life of the application  app.locals.strftime=require('strftime');
// app.locals.title = 'My App';  app.locals.email= 'rikeshlakhe@gmail.com';
// Assigns setting name to value
// app.set('title', 'My Site');

app.get("/",function(req,res){
  res.render('index');
});
// first page when starting the server, get uses first element for routing and second for request and response function



admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
});

secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

secret.get('/user/:id',function(req,res,next){
	// res.send('user:'+req.params.id);
	// res.send(new Buffer('whoop'));
	// redirect to same page when download link is activated
	// res.download(downloadlink);
	// res.redirect('/');
})



// Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
app.route('/events')
.all(function(req,res,next){
	res.send('event page');
	res.send(posts);
})
.get(function(req,res,next){

})
.post(function(req,res,next){

})

secret.get('/jp', baseurl);



// http://localhost:3000/admin/secret   load the 'secret' router on '/secr*t', on the 'admin' sub app
admin.use('/secr*t', secret);
// A route will match any path that follows its path immediately with a “/”
app.use(['/admin','/manager'],admin);


// app.get("/blog",function(req,res){
// 	res.send(posts);
// });
// adding route and we use send to pass the post that contains the link to the mock json file.


// keeping the question mark in /blog/:title? tells that the title is optional
app.get('/blog/:title?',function(req,res){
  var title = req.params.title;
  if(title === undefined){
    res.send(posts);
  }else{
    var post =posts[title] || {};
    res.render('post',{post : post});
}
})

// we have the logic to grab the post according to the route we are in.. we can access this varable in template by providing the second parameter in {post : post} 


app.get('/notworking',function(req,res){
  res.status(503)
  res.send("under construction");
})

  

// Transfers the file at the given path or UPLOAD THE FILE
// file name for test let it be download.txt
app.get('/file/:name', function (req, res, next) {

  var options = {
  	// location of fileName
    root: __dirname + '/mock/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});









// we use listen to listen to the port 3000
app.listen(3000,function(){
	console.log("the frontend server is running in port 3000!");
});