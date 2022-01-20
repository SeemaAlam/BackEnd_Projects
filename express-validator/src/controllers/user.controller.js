const express = require("express");

const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post(
  "/",
  body("first_name").isLength({ min: 1 }).withMessage("Please add first name"),
  body("last_name").isLength({ min: 3 }).withMessage("Please add last name"),
  body("email")
    .isEmail()
    .custom((value) => {
      return User.findOne({ email: { $eq: value } }).then((user) => {
        if (user) throw new Error(`${value} :email exist`);
        return true;
      });
    }),

  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("pincode must be six digit"),

  body("age").custom((value) => {
    if (value < 1 || value > 100)
      throw new Error(`age must be between 1 to 100`);
    return true;
  }),

  body("gender").custom((value) => {
    if (!(value == "male" || value == "female" || value == "others"))
      throw new Error(`gender must be male or female or others only`);
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return {
          param: error.param,
          msg: error.msg,
        };
      });
      return res.status(400).json({ errors: finalErrors });
    }
    const user = await User.create(req.body);
    return res.status(201).json({ data: user });
  }
);

// async (req, res) => {
//   const errors=validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({data:errors.array()});
//   }
//   const user=await User.create(req.body);
//   return res.status(201).json({data:user});
// });

module.exports = router;
