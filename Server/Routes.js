// globals require
﻿var path = require('path');
var fs = require('fs');

module.exports = function (app) {
   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.post('/UploadImage', function (req, res) {
      console.log("Received post to UploadImage endpoint");
      res.status(204).end();
   });
};
