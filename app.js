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

var httpServer = http.createServer();
	
httpServer.on('request', function(req, res) {
	req.pipe(mutator).pipe(logs).pipe(res);
});

httpServer.listen(8080, 'localhost');

