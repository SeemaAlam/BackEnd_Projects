const app = require("./index")
const connect = require("./configs/db")

app.listen(3113, async function () {
    await connect();
    console.log("listening on port 3113");
})