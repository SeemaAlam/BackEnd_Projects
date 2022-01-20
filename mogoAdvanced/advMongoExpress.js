const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());


const connect=()=>{

    return mongoose.connect("mongodb://127.0.0.1:27017/test",{
     useNewUrlParser:true,
     useUnifiedTopology:true,
     useCreateIndex:true

    })
};


const newschema= new mongoose.Schema({
    movie_name:String,
    movie_genre:String,
    production_year:Number,
    budget:Number
});


const User=mongoose.model('movies',newschema);


app.post("/movie" ,async function(req,res){
    
      const user= await User.create(req.body)
     return res.send(user)
})


app.get("/movie", async function(req,res){

  const user=await User.find().lean().exec();

  return res.send(user)



})

app.get("/movie/:id",async function(req,res){

    const user=await User.findById(req.params.id).lean().exec();

    res.send(user);



})
app.patch("/movie/:id",async function(req,res){

    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

    res.send(user);



})

app.delete("/movie/:id",async function(req,res){

    const user=await User.findByIdAndDelete (req.params.id);

    res.send(user);

})

app.listen(3005, async()=>{

   await connect();

    console.log("Welcome")

})