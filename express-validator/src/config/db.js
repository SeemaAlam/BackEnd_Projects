const mongoose=require("mongoose");

// const connect=()=>{
//     return mongoose.connect("mongodb://127.0.0.1:27017/test");
// }

// module.exports=connect;

module.exports=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/web");
}

