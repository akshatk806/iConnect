const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,             // the post which is done by the user is refering to user schema
        ref:'User'
    },

    // Include the array of ids of all comment in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

// Before exporting we have to compile into model
const Post=mongoose.model('Post',postSchema);
module.exports=Post;