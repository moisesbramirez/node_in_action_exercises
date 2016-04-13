"use strict";
let server = require("http").createServer(handler);
let formidable = require("formidable");
let io = require("socket.io")(server);
let socket;
const PORT = 9000;

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

io.on("connection", (incomingSocket) => socket = incomingSocket);

function handler(req, res) {
  if("/" === req.url){
    switch (req.method) {
      case "GET":
        show(res);
      break;
      case "POST":
        upload(req, res);
      break;
      default:
    }
  } else {
    notFound(res);
  }
}

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

function show(res) {
  let html = `
    <body>
      <style>
        .progress-bar {
          width: 200px;
          height: 25px;
          border: 1px solid #BFBFBF;
          background-color: #EFEFEF;
        }
        .progress {
          width: 0%;
          height: 100%;
          display: inline-block;
          background-color: #53E653;
        }
      </style>
      <form method='POST' action='/' enctype='multipart/form-data'>
        <p><input type='text' name='name'/></p>
        <p><input type='file' name='file'/></p>
        <div class="progress-bar"><span class="progress"></span></div>
        <p><input type='submit' value='Upload'/></p>
      </form>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io('http://localhost:${PORT}');
        var progressBar = document.querySelector(".progress");
        socket.on("uploading", function (data) {
          progressBar.style.width = data.percentage + '%';
        });
      </script>
    </body>`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function upload(req, res) {
  if(!isFormData(req)) {
    res.statusCode = 404;
    res.end("Bad Request: expecting multipart/form-data");
    return;
  }

  let form = new formidable.IncomingForm();

  form.on("progress", (bytesReceived, bytesExpected) => {
    let percent = Math.floor(bytesReceived / bytesExpected * 100);
    socket.emit("uploading", { percentage: percent });
  });

  form.parse(req, (err) => {
    if(err) {
      res.statusCode = 500;
      res.end("Internal Server Error: problem occured during upload.")
      return;
    }
    res.end();
  });
}

function isFormData(req) {
  let type = req.headers['content-type'] || '';
  return 0 === type.indexOf('multipart/form-data');
}
