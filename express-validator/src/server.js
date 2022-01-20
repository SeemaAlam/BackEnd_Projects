
const connect=require("./config/db");

const app=require("./index");


app.listen(3003, async ()=>{
    await connect();
    console.log("Listening 3003");
})