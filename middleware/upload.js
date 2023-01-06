const multer  = require("multer")
const path    = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  "./uploads");
    },
    filename:function(req,file,cb){
        cb(null, Date.now() +  "-" + file.originalname)
    }
});

const fileFilter =(req,file,cb)=>{
    const validExts = ['.png','.jpg','jpeg'];

    if(!validExts.includes(path.extname(file.originalname))){
        return cb(new Error("only .png, .jpg, .jpeg format allowed"));
    }

    const fileSize=parseInt(req.headers["content-length"]);
    if(fileSize>1048576){
        return cb(new Error("File size is big"))
    }

    cb(null, true);
}

let upload =multer({
    storage:storage,
    fileFilter:fileFilter,
    fileSize:1048576
});

module.exports=upload.single("productImage");

