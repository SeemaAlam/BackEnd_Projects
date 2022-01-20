const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    gender: {type:String, required:false},
    date_of_birth: {type:String, required:false}
}, {
    versionKey: false
});

const User = mongoose.model("user", userSchema);

module.exports=User;