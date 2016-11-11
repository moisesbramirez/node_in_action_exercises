const connect = require("connect");
const logger = require("./src/middleware/logger");
const helloWorld = require("./src/middleware/helloWorld");
const restrict = require("./src/middleware/restrict");
const admin = require("./src/middleware/admin");
const PORT = 3000;

const app = connect()
  .use(logger)
  .use("/admin", restrict)
  .use("/admin", admin)
  .use(helloWorld)
  .listen(PORT);
