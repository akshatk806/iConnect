const Post=require('../models/posts')
const Comment=require('../models/comment')

module.exports.create=async function(request,response){
    try{
        let post=await Post.create({
            content:request.body.content,
            user:request.user._id
        });

        if(request.xhr){
            return response.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            });         // returning the json
        }
        request.flash('success','Post Published');
        return response.redirect('back')

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
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

            if(request.xhr){
                return response.status(200).json({
                    data:{
                        post_id:request.params.id
                    },
                    message:"Post deleted"
                });
            }
            request.flash('success','Post Deleted');
            return response.redirect('back');
        }
        else{
            request.flash('error','You cannot delete this post');
            return response.redirect('back')
        }
    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }
}