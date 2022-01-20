const express = require("express");

const router = express.Router();

const Admin = require("../models/admin.model");


router.get("/", async (req, res) => {
  try{
  
  const admin = await Admin.find().lean().exec();

  return res.send({admin});
  }
  catch(err){
    return res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try{
    const item=await Admin.create(req.body);
  
    return res.status(201).send({item})
  }
  catch(err){
    return res.status(400).send(err.message);
  }
});

module.exports=router;
