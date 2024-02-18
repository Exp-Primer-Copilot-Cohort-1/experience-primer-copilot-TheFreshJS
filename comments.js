// Create web server
// 1. Create a web server
// 2. Create a router
// 3. Create a handler for the route /comments
// 4. Create a handler for the route /hello
// 5. Start the server
var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response);
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

// Path: index.js
// Create a router
function route(handle, pathname, response) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;

// Path: server.js
// Create a handler for the route /comments
var server = require("./index");
var comments = require("./comments");

var handle = {}
handle["/comments"] = comments.comments;
server.start(server.route, handle);

// Path: comments.js
// Create a handler for the route /comments
function comments(response) {
    console.log("Request handler 'comments' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Comments");
    response.end();
}

exports.comments = comments;

