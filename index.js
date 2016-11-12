const connect = require("connect");
const setupLogger = require("./src/middleware/logger");
const helloWorld = require("./src/middleware/helloWorld");
const restrict = require("./src/middleware/restrict");
const admin = require("./src/middleware/admin");
const PORT = 3000;

const app = connect()
  .use(setupLogger(":method :url"))
  .use("/admin", restrict)
  .use("/admin", admin)
  .use(helloWorld)
  .listen(PORT);
