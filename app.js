var http = require('http');
var stream = require('stream').Writable;

var httpServer = http.createServer(function (req, res) {
	var headers = req.headers;

	console.log(new Date());

	for (key in headers) {
		console.log(key + ': ' + headers[key] + '\n');
	}

	console.log('url: ' + req.url + '\n');
	console.log('verb: ' + req.method + '\n');

	res.writeHead('200');
	res.end('<script>window.location="' + req.url + '";</script>');		// TO-DO: do not perform endless redirects
}
	)
	.listen(8080, '127.0.0.1');
