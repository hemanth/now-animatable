'use strict';
const http = require('http');
const url = require('url');
const marked = require('marked');
const isAnimatable = require('is-animatable');
const readFile = require('fs').readFile;

var server = http.createServer(function (request, resp) {
    var headers = {};
    // landing page
    if (request.url === '/' || request.url === '/favicon.ico') {
      readFile('./readme.md', {encoding: 'utf-8'}, (err, markdownString) => {
        marked(markdownString, (err, content) => {
          if (err) {
            resp.end(JSON.stringify({ error: 'Yikes! Report to @gnumanth'}));
          }
          // send headers
          headers['Content-Type'] = 'text/html';
          resp.writeHead(200, headers);
          resp.end(content);
        });
      });
    } else {
      headers['Content-Type'] = 'text/html';
      resp.writeHead(200, headers);
      var canAnimate = isAnimatable(request.url.replace('/','')) ? 'yes' : 'no';
      resp.end(`<img style='display:block;margin: 0 auto;' src='http://cataas.com/cat/says/${canAnimate}'/>`);
    }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Server running at http://127.0.0.1/ on port " + port);
});


