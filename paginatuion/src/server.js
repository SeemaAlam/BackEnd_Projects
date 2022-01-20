
const connect=require("./config/db");

const app=require("./index");


app.listen(2347, async ()=>{
    await connect();
    console.log("Listening 2347");
})