const mongoose=require("mongoose");

const adminSchema=new mongoose.Schema({
	"first_name" : {type:String, required:true},
	"last_name" : {type:String, required:false},
	"email" : {type:String, required:true},
},);

module.exports=mongoose.model("admindata",adminSchema);
