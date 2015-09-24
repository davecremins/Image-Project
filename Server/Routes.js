// globals require
﻿var path = require('path');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.post('/upload', upload.single('imageSelection'), function (req, res) {
      console.log(req.file);
      console.log(req.body);
      res.status(204).end();
   })
};
