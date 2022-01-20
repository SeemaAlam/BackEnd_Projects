const connect = require("./config/db");

const app = require("./index");

app.listen(2434, async () => {
  await connect();
  console.log("Listening 2434");
});
