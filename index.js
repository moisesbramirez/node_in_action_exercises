const connect = require("connect");
const logger = require("./src/middleware/logger");
const PORT = 3000;
const app = connect();
app.use(logger);

app.listen(PORT);
