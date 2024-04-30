const multer=require("multer");
const fs=require("fs");
const path=require("path");
const { APIError } = require("../utils/errors");

const fileFilter=(req,file,cb)=>{
    const allowedTypes=["images/jpg", "image/png", "image/jpeg", "image/webp"];

    if(!allowedTypes.includes(file.mimetype)){
        cb(new APIError(`${file.mimetype} format not supported, please select a different type file`, "FileTypeError", 400))
    }

    cb(null, true)
};

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        const fieldname=file.fieldname;
        const rootDir=path.dirname(require.main.filename);
        if(fieldname=="authorImg"){
            fs.mkdirSync(path.join(rootDir, "/src/public/uploads/images/authors"),{recursive: true});
            cb(null, path.join(rootDir, "/src/public/uploads/images/authors"));
        }else if(fieldname=="bookImage"){
            fs.mkdirSync(path.join(rootDir, "/src/public/uploads/images/books"),{recursive: true});
            cb(null, path.join(rootDir, "/src/public/uploads/images/books"));
        }else{
            fs.mkdir(path.join(rootDir, "/src/public/uploads/images"),{recursive: true});
            cb(null, path.join(rootDir, "/src/public/uploads/images"));
        }
    },
    filename:(req,file, cb)=>{
        const filename=path.parse(file.originalname).name;
        const mimetype=file.mimetype.split("/")[1];

        cb(null, filename + "-" + Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + mimetype );
    }
});

const upload=multer({storage:storage, fileFilter});
module.exports.upload=upload;