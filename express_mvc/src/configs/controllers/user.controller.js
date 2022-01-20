const express=require("express");

const User=require("../../models/user.model");

const crudController=require("./crud.controller");

const router= express.Router();

router.get("",crudController.get(User));

router.post("",crudController.post(User));

router.get("/:id",crudController.getOne(User));

router.patch("/:id",crudController.updateOne(User));

router.delete("/:id",crudController.deleteOne(User));

module.exports=router;