var http = require('http');
// var https = require('https');

var httpServer = http.createServer(function (req, res) {
	// var headers = req.headers;

	// // commence reporting
	// console.log(new Date());

	// for (key in headers) {
	// 	console.log(key + ': ' + headers[key] + '\n');
	// }

	// console.log('url: ' + req.url + '\n');
	// console.log('verb: ' + req.method + '\n');

	// res.end("Aw yeah baby");

}).listen(8080, '127.0.0.1');

httpServer.on('request', function(req, res) {
	console.log('cheeki');
	res.writeHead('200');
	res.end('normal');
});
