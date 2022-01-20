const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    date: { type:String, required: true },
    instructor: { type: String, required: true },
    topic : { type: String, require: true }  
},
    {
        versionKey: false,
        timestamps: true
})

const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports=Evaluation;