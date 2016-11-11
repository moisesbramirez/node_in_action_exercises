module.exports = helloWorld;

function helloWorld(request, response) {
  response.setHeader("Content-Type", "text/plain");
  response.end("Hello World");
}
