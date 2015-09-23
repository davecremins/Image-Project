var express = require('express');
var bodyParser = require('body-parser');
var app = express();

module.exports = function(){
   app.use(express.static(__dirname + '/dist'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: false}));

   return app;
};