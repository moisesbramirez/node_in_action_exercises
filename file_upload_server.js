"use strict";
let http = require("http");
let formidable = require("formidable");
const PORT = 9000;

let server = http.createServer((req, res) => {
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
});
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

function show(res) {
  let html = `<form method='POST' action='/' enctype='multipart/form-data'>
                <p><input type='text' name='name'/></p>
                <p><input type='file' name='file'/></p>
                <p><input type='submit' value='Upload'/></p>
              </form>`;
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
    // console.log(`${percent}%`);
  });

  form.parse(req, (err, fields, files) => {
    // console.log(fields);
    // console.log(files);
    res.end("upload complete!");
  });
}

function isFormData(req) {
  let type = req.headers['content-type'] || '';
  return 0 === type.indexOf('multipart/form-data');
}
