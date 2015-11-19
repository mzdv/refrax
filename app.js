var http = require('http');
var Duplex = require('stream').Duplex;
var mutator = new Duplex();

var Writable = require('stream').Duplex;
var logs = new Duplex();

var test;
var test2;

mutator._read = function() {
	console.log("Mutator exit");
	mutator.push(test);
	mutator.push(null);
}

mutator._write = function(chunk, enc, next) {
	console.log("Mutator entry: " + chunk);
	test = chunk;
	next();
}

logs._write = function(chunk, enc, next) {
	console.log("Rhythm is a dancer: " + chunk);
	test2 = chunk;
	next();
}

logs._read = function() {
	logs.push(test2);
	logs.push(null);
}
// var loggingData = new Readable;

var httpServer = http.createServer(function (req, res) {
	req.pipe(mutator).pipe(logs).pipe(res);
	// res.end();
		
	// var headers = req.headers;

	// console.log(new Date());

	// for (key in headers) {
	// 	console.log(key + ': ' + headers[key] + '\n');
	// }

	// console.log('url: ' + req.url + '\n');
	// console.log('verb: ' + req.method + '\n');

	// res.writeHead('200');
	// res.end('<script>window.location="' + req.url + '";</script>');		// TO-DO: do not perform endless redirects
})
	.listen(8080, '127.0.0.1');
