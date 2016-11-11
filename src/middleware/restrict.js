module.exports = restrict;

function restrict(req, res, next) {
  const authorization = req.headers.authorization;
  if(!authorization) return next(new Error("Unauthorized"));

  const parts = authorization.split(" ");
  const scheme = parts[0];
  const auth = new Buffer(parts[1], "base64").toString().split(":");
  const user = auth[0];
  const pass = auth[1];

  authenticateWithDatabase(user, pass, function(err) {
    if(err) return next(err);
    next();
  });
}

function authenticateWithDatabase(user, pass, cb) {
  if(user === "test" && pass === "test") return cb();//mock
  return cb(new Error("No such user."));
}
