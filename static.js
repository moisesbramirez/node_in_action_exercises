"user strict";

var http = require("http");
var fs = require("fs");
var parse = require("url").parse;
var join = require("path").join;
var PORT = 9000;

var server = http.createServer(function(req,res) {
  var url = parse(req.url);
  var path = join( __dirname, url.pathname);
  fs.stat(path, function(err, stat) {
    if (err) {
      if(err.code === "ENOENT") {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    } else {
      res.setHeader("Content-Length", stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      stream.on("error", function(err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }
  });
});

server.listen(PORT);
