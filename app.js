//============================================================================//
/*SETUP*/
//============================================================================//

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//============================================================================//
/*ROUTES*/
//============================================================================//

app.get('/', function(req, res){
  res.render('landing');
});























































































app.listen(8000, function(){
  console.log("Port 8000");
})
