module.exports = setupLogger;

function setupLogger(format) {
  const regexp = /:(\w+)/g;

  return function logger(request, response, next) {
    const str = format.replace(regexp, (match, property) =>  request[property]);
    console.log(str);
    next();
  };
}
