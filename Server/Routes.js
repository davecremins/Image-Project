// globals require
﻿var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var db = require('./db/db.js')('mongodb://localhost:27017/Images');
var tagQuery = 'family';

module.exports = function (app) {
   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageShow.html'));
   });

   app.get('/TagNewImage', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.get('/NextImage', function(req, res){

      // default to first image with tag 'family'
      db.get('Metadata', 'tags', 'family', function(result){
         console.log(result[0]);
         res.sendFile(path.join(__dirname + '/' + result[0].file.path));
      });

   });

   app.post('/upload', upload.single('imageSelection'), function (req, res) {
      console.log(req.file);
      console.log(req.body);

      var imgData = {
         file: req.file,
         tags: req.body.tags, // Convert this to array later
         originalDimensions: {
            width: parseInt(req.body.origWidth),
            height: parseInt(req.body.origHeight)
         }
      };

      db.insert('Metadata', imgData);
      res.status(204).end();
   })
};
