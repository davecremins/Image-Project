/* globals require, __dirname */
var path = require('path');
var db = require('./db/db.js')('mongodb://localhost:27017/Images');
var imgIndexer = require('./lib/imageIndexer.js');

module.exports = function (app, io) {
   var uploadInfo = { dest: 'uploads/' }; 
   var tagQuery = 'family';
   
   // Every client that connects should be fed the same data
   // They should get the current image and slot into the 
   // schedulers rotation => Need to handle a new connection and
   // the scheduled emit
   db.get('Metadata', 'tags', tagQuery, function(result){
      console.log(result.length + ' previous image objects found in db');
      imgIndexer.set(result);
      console.log('image indexer set - size: ' + imgIndexer.size()) 
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
      res.sendFile(path.join(__dirname + '/' + uploadInfo.dest + req.query.filename));
   });

   app.post('/setTagRotation', function (req, res) {
      tagQuery = req.body.newTag;
      res.status(204).end();
   });

   var upload = require('multer')(uploadInfo);
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
        imgIndexer.add(imgData); 
      };
      
      db.insert('Metadata', imgData, addToIndexer);
      res.status(204).end();
   });
   
   io.on('connection', function (socket) {
      io.emit('nextImage', imgIndexer.current());
   });
   
   require('./lib/imageScheduler.js')(io, imgIndexer, 10000).Schedule();
};