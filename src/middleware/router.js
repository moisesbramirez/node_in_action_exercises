const parse = require("url").parse;

function setupRouter(options) {
  return function router(req, res, next) {
    if(!options[req.method]) {
      next();
      return;
    }
    const routes = options[req.method];
    const url = parse(req.url);
    const paths = Object.keys(routes);

    paths.forEach( path => {
      const fn = routes[path];
      path = path
        .replace(/\//g, "\\/")
        .replace(/:(\w+)/g, "([^\\/]+)");
      const regExp = new RegExp(`^${path}$`);
      const captures = url.pathname.match(regExp);
      
      if(captures) {
        const args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return
      }
    });
    next();
  }
}

module.exports = setupRouter;
