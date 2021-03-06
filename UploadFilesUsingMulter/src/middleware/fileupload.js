const path=require('path');

const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null,path.join(__dirname,"../uploads"))
    },
    filename:(req,file,callback)=>{
        // callback(null, new Date().toISOString()+ file.originalname );
        const uniquePrefix=Date.now()+"-"+ Math.round(Math.random()*1E9);

        callback(null, uniquePrefix+"-"+file.originalname);
    }
});

const fileFilter=(req,file,callback)=>{
     if(file.mimetype==="image/jpeg"|| file.mimetype==="image/png" || file.mimetype==="image/jpg"){
        callback(null,true);
     }
     else{
        callback(null,false);
     }
}


const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})

module.exports=upload;