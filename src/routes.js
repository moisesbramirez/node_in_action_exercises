const routes = {
  GET: {
    "/users" : function(req, res) {
      res.end("tobi, loki, ferret");
    },
    "/users/:id": function(req, res, id) {
      res.end(`user ${id}`);
    }
  },
  DELETE: {
    "/users/:id": function(req, res, id) {
      res.end(`delete user ${id}`);
    }
  }
};

module.exports = routes;
