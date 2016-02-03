/* globals __dirname */
var express = require('express');
var app = express();

module.exports = function(){
   app.use(express.static(__dirname + '/dist'));
   return app;
};