const express=require("express");

const app=express();

//app.use(logger);

app.use(express.json());

const users=require("./books.json");

app.get("/",function(req,res){
   
    res.send(users);

});

app.post("/books",logger,function(req,res){
    res.send(req.query);
   });

   app.get("/books/:id",function(req,res){
    res.send(`user with ${req.params.id} is here`);
   });

   app.patch("/books/:id",function(req,res){
    res.send(`user with ${req.params.id} is updated`);
   });

   app.delete("/books/:id",function(req,res){
    res.send(`user with ${req.params.id} is deleted`);
   });

   function logger(req,res,next){
    console.log(req.query);
    console.log("logger before");
    if(req.query.api_requested_by=="seema"){
        next()
    }
     else{
       res.send("User is not authonticated")  
     }
   }


app.listen(2220,function(){
    console.log("Listening 2220")
});