const Post=require('../models/posts')
const Comment=require('../models/comment')

module.exports.create=async function(request,response){
    try{
        await Post.create({
            content:request.body.content,
            user:request.user._id
        });
        return response.redirect('back')

    }catch(err){
        console.log("Error:",err);
        return;
    }
}


// Deleting a post
module.exports.delete=async function(request,response){

    try{
        let post=await Post.findById(request.params.id);
    
        //  .id means converting the objectid into the string,   .id is provided by mongoose
        if(post.user == request.user.id){
            post.remove();
            
            await Comment.deleteMany({post:request.params.id})
            return response.redirect('back');
        }
        else{
            return response.redirect('back')
        }
    }catch(err){
        console.log("Error:",err);
        return;
    }
}