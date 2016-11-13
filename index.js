const connect = require("connect");
const router = require("./src/middleware/router");
const routes = require("./src/routes");
const PORT = 3000;

connect()
.use(router(routes))
.listen(PORT);
