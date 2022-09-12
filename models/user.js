// creating a schema
const mongoose=require('mongoose');

const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{                 // avatar field, path saved here
        type:String
    }
},{
    timestamps:true
});


let storage=multer.diskStorage({
    destination:function(req,file,cb){                            // cb-> callback
        cb(null, path.join(__dirname,'..',AVATAR_PATH))           // -> models/users.js+..+/uploads/users/avatars
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now());                  // For every file I upload for this field for every user that will be stored as avatar-data.now()
    }
});

// static functions (just like in OOPs)

userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');

userSchema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model('User',userSchema);
module.exports=User;