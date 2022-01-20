const express = require('express');

const router = express.Router();

const Product = require("../models/product.model");

const client=require("../configs/redis");

router.get("/",(req, res)=> {
   client.get("products", async function(err,data){

       if(err) return res.status(500).json({status:"failed", message:err.message});

       if(data) return res.status(201).json({status:"sucess", product:JSON.parse(data)});

       try{
        const page= +req.query.page || 1;
        const size= +req.query.size || 10;

        const offset=(page-1)*size;

        const products = await Product.find().skip(offset).limit(size).lean().exec();

        const productcount=await Product.find().countDocuments();

        const totalpages=Math.ceil(productcount/size);
       
        client.set("products", JSON.stringify(products));
    
        return res.status(201).send({db_products:products,totalpages});//use same n single key for frontend like({products}) to make data fetching easy
    
    }catch(err){
    
        return res.status(400).send({err:err});
    
    }
   });
    
});

router.post("/",async (req, res)=> {
 try{
     const product=await Product.create(req.body);

     const products = await Product.find().lean().exec();

     client.set("products", JSON.stringify(products));

     return res.status(201).send({product});

 }catch(err){
     return res.status(400).send({err});
 }
 });

 router.get("/:id",(req, res)=> {
    client.get(`products.${req.params.id}`, async function(err,data){
 
        if(err) return res.status(500).json({status:"failed", message:err.message});
 
        if(data) return res.status(201).json({status:"sucess", products:JSON.parse(data)});
 
        try{
         const product = await Product.findById(req.params.id).lean().exec();
        
         client.set(`products.${req.params.id}`, JSON.stringify(product));
     
         return res.status(201).send({db_products:product});
     
     }catch(err){
     
         return res.status(400).send({err:err});
     
     }
    });
     
 });

 router.patch("/:id",async (req, res)=> {
    
 
        try{
         const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        
         client.set(`products.${req.params.id}`, JSON.stringify(product));

         const products=await Product.find().lean().exec();

         client.set(`product`, JSON.stringify(products));
     
         return res.status(201).send({product});
     
     }catch(err){
     
         return res.status(400).send({err:err});
     
     }
    
     
 });


 router.delete("/:id",async (req, res)=> {
    
 
    try{
     const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
     // let id=product["_id"];
     //let name=product["name"];

    //  client.hmset("delete",
    //      ["deletedproductsid", id,
    //      "deletedproductname",name]
    //     );
    

     client.del(`products.${req.params.id}`);

     const products=await Product.find().lean().exec();

     client.set(`products`, JSON.stringify(products));
 
     return res.status(200).send({product});

 }catch(err){
 
     return res.status(400).send({err:err});
 
 }

 
});



module.exports = router;