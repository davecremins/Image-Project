/* globals require, __dirname */
var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var db = require('./db/db.js')('mongodb://localhost:27017/Images');
var imgIndexer = require('./lib/imageIndexer.js');

module.exports = function (app) {
   var tagQuery = 'family';
      
   db.get('Metadata', 'tags', tagQuery, function(result){
      console.log(result.length + ' previous image objects found in db');
      imgIndexer.set(result);
      console.log('image manager set - size: ' + imgIndexer.size()) 
   });         

   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageShow.html'));
   });

   app.get('/TagNewImage', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.get('/NextImageData', function(req, res){
      res.send(imgIndexer.next());
   });

   app.get('/GetImage', function(req, res){
      res.sendFile(path.join(__dirname + '/' + imgIndexer.current().file.path));
   });

   app.post('/setTagRotation', function (req, res) {
      tagQuery = req.body.newTag;
      res.status(204).end();
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

      var addToIndexer = function(){
        imgIndexer.add(this); 
      };
      
      db.insert('Metadata', imgData, addToIndexer);
      res.status(204).end();
   });
};