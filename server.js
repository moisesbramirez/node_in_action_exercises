"use strict";
var http = require("http");
var url = require("url");
var PORT = 9000;
var items = [];

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case "POST":
      var item = "";
      req.setEncoding("utf8");
      req.on("data", function(chunk) {
        item += chunk;
      });
      req.on("end", function() {
        items.push(item);
        res.end("OK\n");
      });
      break;
    case "GET":
      items.forEach( function(item, index) {
        res.write( index + ") " + item + "\n");
      });
      res.end();
      break;
    case "DELETE":
      var path = ulr.parse(req.url).pathname;
      var index = parseInt(path.slice(1), 10);

      if( isNaN(index)) {
        res.setStatusCode = 400;
        res.end("Invalid item id");
      } else if( !item[index]) {
        res.setStatusCode = 404;
        res.end("Item not found");
      } else {
        items.splice(index, 1);
        res.end("OK\n");
      }
      break;
    default:
      res.setStatusCode = 500;
      res.end("Internal Server Error.");
  }
});

server.listen(PORT);
