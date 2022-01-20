
const post=(model)=>async(req,res)=>{
    try{
    const item=await model.create(req.body);
    return res.status(201).send({item});
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const get=(model)=>async(req,res)=>{
    try{
    const item=await model.find().lean().exec();
    return res.status(200).send({item});
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const updateOne=(model)=>async(req,res)=>{
    try{
    const item=await model.findById(request.params.id, request.body, { new: true }).lean().exec();
    
    return res.status(200).send({item});
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const deleteOne=(model)=>async(req,res)=>{
    try{
    const item=await model.findById(req.params.id).lean().exec();
    return res.status(200).send({item});
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const getOne=(model)=>async(req,res)=>{
    try{
    const item=await model.findById(req.params.id).lean().exec();
    return res.status(200).send({item});
    }catch(err){
        return res.status(400).send(err.message);
    }
}

module.exports={
    post,
    get,
    getOne,
    updateOne,
    deleteOne
};