//============================================================================//
/*SETUP*/
//============================================================================//

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    bcrypt = require('bcrypt'),
    session = require('express-session');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'Macjoseph',
  resave: true,
  saveUninitialized: false
}));
mongoose.connect('mongodb://localhost/academy_app');
//============================================================================//
/*ROUTES*/
//============================================================================//

/*HOME PAGE ** NOT SIGNED IN*/
app.get('/', function(req, res){
  res.render('landing');
});

/*USER AUTHENTIFICATION ** REGISTER*/
app.post('/register', function(req, res){
  if(req.body.email && req.body.password){

    var userData = {
      email: req.body.email,
      password: req.body.password,
    }

    User.create(userData, function(err, user){
      if(err){
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

/*USER AUTHENTIFICATION ** LOGIN*/
app.post('/login', function(req, res, next){
  if(req.body.email && req.body.password){
    // console.log("session : " + JSON.stringify(req.session));
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user){
        var err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        console.log(req.session.userId);
        res.send("Hi");
      }
    });
  }



});





























































































app.listen(8000, function(){
  console.log("Port 8000");
})
