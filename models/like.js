const mongoose=require('mongoose');

// The like belong to either post or comment
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // This defines the objectId of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,           // type would be post or comment
        required:true,
        refPath:'onModel'                                 // Dynamic refrence, refPath means we are going to place to some other field which is there and that is field is going to defined on which type of object the like is placed
    },
    // This field is used for defining the type of the liked object since it is the dynamic refrence
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']                    // The value which can put in this field either post or the comment, a likeable can be a post or a comment
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;