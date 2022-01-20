
const express=require("express");
const app=express();

const userController=require("./controllers/user.controller");
const adminController=require("./controllers/admin.controller");

app.use(express.json());

app.use("/user", userController);
app.use("/admin", adminController);

module.exports=app;