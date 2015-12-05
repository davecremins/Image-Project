// globals require
var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var db = require('./db/db.js')('mongodb://localhost:27017/Images');
var imgManager = require('./imageManager.js');

module.exports = function (app) {
   var tagQuery = 'family';
      
   db.get('Metadata', 'tags', tagQuery, function(result){
      console.log(result.length + ' previous image objects found in db');
      // console.log(result);
      imgManager.set(result);
      console.log('image manager set - size: ' + imgManager.size()) 
   });         

   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageShow.html'));
   });

   app.get('/TagNewImage', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.get('/NextImageData', function(req, res){    
      
      console.log("Route: /NextImageData");
      var obj = imgManager.next();
      console.log(obj._id);
      
      res.send(obj);
   });

   app.get('/GetImage', function(req, res){
      // console.log(imgManager.current());
      res.sendFile(path.join(__dirname + '/' + imgManager.current().file.path));
   });

   app.post('/setTagRotation', function (req, res) {
      console.log(req.body);
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

      db.insert('Metadata', imgData);
      imgManager.add(imgData);
      console.log('image manager updated - size: ' + imgManager.size());
      res.status(204).end();
   });
};