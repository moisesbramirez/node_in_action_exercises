"use strict";
let http = require("https");
let fs = require("fs");
const PORT = 9000;

let options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./key-cert.pem")
}

http.createServer(options, handler).listen(PORT, serverDetails);

function handler(req, res) {
  res.statusCode = 200;
  res.end("Sup World");
}

function serverDetails() {
  console.log(`Server running on https://localhost:${PORT}`);
}
