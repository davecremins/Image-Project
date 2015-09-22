var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
require('./routes')(app);

var port = 3001;
var server = app.listen(port, function () {
   console.log("Image web server running on port %s", port);
});