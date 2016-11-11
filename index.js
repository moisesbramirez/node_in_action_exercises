const connect = require("connect");
const logger = require("./src/middleware/logger");
const helloWorld = require("./src/middleware/helloWorld")
const PORT = 3000;
const app = connect();
app.use(logger);
app.use(helloWorld);

app.listen(PORT);
