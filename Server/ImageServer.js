var app = require('./configure')();
require('./routes')(app);

var port = 4991;
var server = app.listen(port, function () {
   console.log("Image web server running on port %s", port);
});