const express = require('express');

const router = express.Router();

const Post = require("../models/post.model")

const authenticate = require('../middlewares/authenticate')


router.get("/:id", authenticate, async function(req, res) {
    try{
    const post = await Post.find({ user: req.params.id }).lean().exec();
    const user = req.user;

    delete user.password
    return res.status(201).send({post, user})
    }catch(err){
        return res.status(400).send(err.message);
    }
})


router.post("", async (req, res) => {
    try {
    const post= await Post.create(req.body);
      return res.status(201).send({ post });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  });

module.exports = router;