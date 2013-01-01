// A simple, static server for those that don't want to patch into an
// existing webserver.
var http = require('http');
var nodeStatic = require('node-static');

var port = 8080;

//Now the server
var file = new(nodeStatic.Server)('./static');
var server = http.createServer(function(request, response) {
    console.log("Handling request: " + request.url);

    //Otherwise, serve out of static.
    file.serve(request, response, function (e, res) {
	if (e && (e.status === 404)) { // If the file wasn't found
	    response.writeHead("302", "Moved Temporarily", {
		"Location": "/index.html",
		"content-type": "text/plain"
	    });
	    response.end("404: Redirecting you to the index...");
	}
    });
});

console.log("Point your browser at http://localhost:" + port);
server.listen(port);
