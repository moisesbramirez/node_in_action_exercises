"use strict";
var http = require("http");
var qs = require("querystring");
var PORT = 9000;
var items = [];

var server = http.createServer(function(req, res) {
  if("/" == req.url) {
    switch (req.method) {
      case "GET":
        show(res);
        break;
      case "POST":
        var data = "";
        req.setEncoding("utf8");
        req.on("data", function(chunk) {
          data += chunk;
        });
        req.on("end", function(chunk) {
          data = qs.parse(data);
          (data.itemIndex) ? deleteItem(data) : addItem(data);
          show(res);
        });
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});
server.listen(PORT);

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found.")
}

function badRequest(res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Bad Request");
}

function show(res) {
  var html = "<html><head><title>ToDo List</title></head><body>"
            + "<h1>ToDo List</h1>"
            + "<ul>"
            + items.map(function(item, index){
              return "<li>" + item +
                      "<form method='POST' action='/'>"
                      +"<input style='display:none;' name='itemIndex' value='"+ index +"'/>"
                      +"<input type='submit' value='Delete Item'/>"
                      +"</form></li>"
            }).join("")
            + "</ul>"
            + "<form method='post' action='/'>"
            + "<p><input type='text' name='item'/></p>"
            + "<p><input type='submit' value='Add Item'/></p>"
            + "</form></body></html>";
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function addItem(data) {
  items.push(data.item);
}

function deleteItem(data) {
  items.splice( parseInt(data.itemIndex), 1);
}
