"use strict";
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var chatServer = require("./lib/chat_server.js").listen(http);
var PORT = 9000;

app.use("/stylesheets", express.static( __dirname + "/public/stylesheets" ));
app.use("/javascripts", express.static( __dirname + "/public/javascripts"));

app.get("/", function(req, res) {
  res.sendFile( path.join(__dirname + "/public/index.html"));
});

http.listen(PORT, function() {
  console.log("Server running on http://localhost:" + PORT);
});
