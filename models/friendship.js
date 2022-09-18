// Friendship schema
const mongoose=require('mongoose');

const friendshipSchema=new mongoose.Schema({
    // the user who sent the friend request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // the user who accepted the friend request, the naming is just to understand otherwise the users won't see a diffrence
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Friendship=mongoose.model('Friendship',friendshipSchema);
module.exports=Friendship;