const express = require("express");

const app = express();

const connect = require("./configs/db");

const userController=require("./configs/controllers/user.controller");
const studentController=require("./configs/controllers/student.controller");
const evaluationController=require("./configs/controllers/evaluation.controller");


app.use(express.json());

app.use("/user", userController);
app.use("/student",studentController);
app.use("/evaluation", evaluationController);

app.listen(1245, async () => {
    await connect();
    console.log("listening to the port 1245");
})

