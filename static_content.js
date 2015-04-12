module.exports = function(request, response) {

	var fs = require('fs');

	function get_header_from_url(url) {
		var url_split = url.split('.');
		return url_split[1];
	}

	var url_split = request.url.split('/');
	var type = url_split[1];
	var local_path = "." + request.url;

	fs.exists(local_path, render_page);

	function render_page(exists) {
		if (exists) {
			if(type == "views") {
				fs.readFile(local_path, "utf-8", function(error, content){
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write(content);
					response.end();
				});
			} else if(type == "images") {
				fs.readFile(local_path, function(error, content){
					response.writeHead(200, {'Content-Type': 'image/jpg'});
					response.write(content);
					response.end();
				});
			} else if(type == "css") {
				fs.readFile(local_path, function(error, content){
					response.writeHead(200, {'Content-Type': 'text/css'});
					response.write(content);
					response.end();
				});
			} else if (type == "private") {
				fs.readFile("./error.html", "utf-8", function(error, content){
					response.writeHead(404, {'Content-Type': 'text/html'});
					response.write(content);
					response.end();
				});
			}
		} else {
			fs.readFile("./error.html", "utf-8", function(error, content){
					response.writeHead(404, {'Content-Type': 'text/html'});
					response.write(content);
					response.end();
			});
		}
	}

}