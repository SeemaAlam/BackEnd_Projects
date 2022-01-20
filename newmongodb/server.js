const express=require("express");
const mongoose=require("mongoose");

const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema=new mongoose.Schema({
    "id" : {type:Number, required:true},
    "movie_name": {type:String, required:true},
    "movie_genre" :{type:String, required:false},
    "production_year" : {type:Number, required:false},
    "budget" : {type:Number, required:false}
});

const Movie=mongoose.model("movie",userSchema);

const app=express();

app.use(express.json());

//-----------CRUD--------------

app.post("/movies", async(req,res)=>{
    const movie=await Movie.create(req.body).lean().exec();//insert
    return res.status(201).send({movie});
});

app.get("/movies", async(req,res)=>{
    const movies=await Movie.find().lean().exec();//find
    return res.status(200).send({movies});
});

app.get("/sortmovies", async(req,res)=>{
   // const movie=await Movie.find();//find
   // return res.status(200).send({movie}).sort({id:-1});//sort

    const movie=await Movie.find().sort({id:1}).lean().exec();//find and sort// thenable=>proper promise
    return res.status(200).send({movie});
});

app.patch("/movies/:id",async(req,res)=>{
    //db.users.update({_id:"id"},{$set:{}})
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();//new to get updated value
return res.status(204).send({movie});
})

app.delete("/movies/:id",async(req,res)=>{
    //db.users.remove({_id:"id"})
const movie=await Movie.findByIdAndDelete(req.params.id).lean().exec();//
return res.status(200).send({movie});
});

app.get("/movies/:id",async(req,res)=>{
    //db.users.remove({_id:"id"})
const movie=await Movie.findById(req.params.id).lean().exec();//
return res.status(200).send({movie});
});


app.listen(2220,async function(){
    await connect();
    console.log("Listening 2220")
});
