let multer = require("multer");
let maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        if(!file) cb(new Error("upload file error"), null)
        cb(null, './public'); 
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    },
});

let upload = multer({
    storage: storage,
    limits : {
        fileSize: maxSize
    },
});

module.exports =upload;