const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    roll_id: {type: Number, required: true},
    current_batch: { type: String, required: true },
    marks:{type: Number, required: true},
    eval: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluation",
      require: true,
  }
  },
  
    {
    versionKey: false
})

const Student = mongoose.model("student", studentSchema);

module.exports=Student;