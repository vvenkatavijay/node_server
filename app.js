var http = require('http');

var static_contents = require('./static_content.js');
//
//creating a server
server = http.createServer(function (request, response){
  static_contents(request, response);  //this will serve all static files automatically
});

server.listen(8000);
console.log("Running in localhost at port 8000");