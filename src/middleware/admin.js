module.exports = admin;

function admin(req, res) {
  switch (req.url) {
    case "/":
      res.end("try /users");
      break;
    case "/users":
      res.setHeader("Content-Type", "application/json");
      res.end( JSON.stringify(["tobi", "loki", "jane"]) );
      break;
  }
}
