const express=require("express");

const Student=require("../../models/student.model");
const Evaluation=require("../../models/evaluation.model");

const crudController=require("./crud.controller");

const router= express.Router();

router.get("",crudController.get(Evaluation));

router.post("",crudController.post(Evaluation));

router.get("/:id",crudController.getOne(Evaluation));

router.patch("/:id",crudController.updateOne(Evaluation));

router.delete("/:id",crudController.deleteOne(Evaluation));

// fetch all students who gave a particular evaluation by evaluation id

router.get("/:id/students", async function(request, respond){
    try{
   const data = await Student.find({eval:request.params.id}).lean().exec();

    const data1 = await Evaluation.findById(request.params.id).lean().exec();

    return respond.send({data,data1});
    
    }catch(err){
        return respond.status(400).send(err.message);  
    }
});

//fetch the student with his personal details who scored the highest mark in the evaluation

router.get("/:id/students/topper", async function(request, respond){
    try{
   const data = await Student.find({eval:request.params.id}).sort({marks:-1}).limit(1).lean().exec();

    const data1 = await Evaluation.findById(request.params.id).lean().exec();

    return respond.send({data,data1});
    
    }catch(err){
        return respond.status(400).send(err.message);  
    }
});



module.exports=router;