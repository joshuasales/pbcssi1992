
const multer = require('multer');
const path   = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function(req, file2, fn){
    fn(null,  new Date().getTime().toString()+'-'+file2.fieldname+path.extname(file.originalname));
  }
}); 

//init

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:6000000 },
  fileFilter: function(req, file2, callback){
    validateFile(file2, callback);
  }
}).single('file2');


var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    console.log("umabot");
  }
}


module.exports = upload2;