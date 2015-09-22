// globals require
﻿var path = require('path');
var fs = require('fs');

module.exports = function (app) {
   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname+'/views/ImageTagger.html'));
   });

   app.get('/reportdata', function (req, res) {

      console.log('Request recieved for load data.');

      fs.readFile('../LoadData.json', 'utf8', function (err, data) {
         if (err) {
            console.error('ERROR occured reading load data file.');
            res.status(500).json({ error: 'Unable to load report data.' });
         } else {
            console.log('Load data successfully read.');
            res.json(JSON.parse(data));
         }
      });
   });
};
