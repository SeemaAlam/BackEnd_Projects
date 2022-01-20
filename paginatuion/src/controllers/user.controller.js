const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const Admin = require("../models/admin.model");

const sendMail=require("../utils/sendmail");

const path=require("path");


router.get("/", async (req, res) => {
  try{

    const page= +req.query.page || 1;
    const size= +req.query.size || 3;

    const offset=(page-1)*size;
  
  const users = await User.find().skip(offset).limit(size).lean().exec();

  const usercount=await User.find().countDocuments();

  const totalpages=Math.ceil(usercount/size);

  return res.send({users, totalpages});
  }
  catch(err){
    return res.status(400).send(err.message);
  }
});


router.post("/", async (req, res) => {
  try{
    const item=await User.create(req.body);
    const admins=await Admin.find().lean().exec();

    sendMail({
      from: "sim.alam20@gmail.com",
  
      to: req.body.email,
  
      subject: `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
  
      text: `Hi ${req.body.first_name} , Please confirm your email address.`,
  
      html: `<h2>Hi ${req.body.first_name} , Please confirm your email address.</h2>`,

      path:path.join(__dirname,"../file/attach.txt")
    })

    admins.forEach(element => {
      sendMail({
        from: "sim.alam20@gmail.com",
    
        to: element.email,
    
        subject: `${req.body.first_name} ${req.body.last_name} has registered with us.`,
    
        text: `Please welcome ${req.body.first_name} ${req.body.last_name}.`,
    
        html: `<h2>Please welcome ${req.body.first_name} ${req.body.last_name}.</h2>`,
  
        path:path.join(__dirname,"../file/attach.txt")
      })
    });
   
  
    return res.status(201).send({item})
  }
  catch(err){
    return res.status(400).send(err.message);
  }
});



module.exports=router;
