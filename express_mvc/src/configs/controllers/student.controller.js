const express = require("express");

const Student=require("../../models/student.model");

const crudController=require("./crud.controller");

const router= express.Router();

router.get("",crudController.get(Student));

router.post("",crudController.post(Student));

router.get("/:id",crudController.getOne(Student));

router.patch("/:id",crudController.updateOne(Student));

router.delete("/:id",crudController.deleteOne(Student));


module.exports=router;