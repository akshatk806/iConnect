const Post=require('../models/posts')
const Comment=require('../models/comment')

module.exports.create=function(request,response){
    Post.create({
        content:request.body.content,
        user:request.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating a post :",err)
            return;
        }
        return response.redirect('back')
    });
}


// Deleting a post
module.exports.delete=function(request,response){
    Post.findById(request.params.id,function(err,post){
        //  .id means converting the objectid into the string,   .id is provided by mongoose
        if(post.user == request.user.id){
            post.remove();
            Comment.deleteMany({post:request.params.id},function(err){
                return response.redirect('back');
            })
        }
        else{
            return response.redirect('back')
        }
    })
}