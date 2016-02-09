var app = require('./configure')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./appSetup')(app, io);

var port = 4991;
server.listen(port, function () {
   console.log("Image web server running on port %s", port);
});
