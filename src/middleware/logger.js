module.exports = logger;

function logger(request, response, next) {
  console.log("%s %s", request.method, request.url);
  next();
}
