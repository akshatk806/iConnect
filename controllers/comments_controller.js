const Comment=require('../models/comment')
const Post=require('../models/posts')

module.exports.create=function(request,response){
    Post.findById(request.body.post,function(err,post){
        if(post){
            Comment.create({
                content:request.body.content,
                post:request.body.post,
                user:request.user._id
            },function(err,comment){
                post.comments.push(comment);
                post.save();

                response.redirect('/');
            });
        }
    })
}

module.exports.delete=function(request,response){
    Comment.findById(request.params.id,function(err,comment){
        if(comment.user==request.user.id){
            let postId=comment.post

            comment.remove()

            Post.findByIdAndUpdate(postId,{$pull:{comments:request.params.id}},function(err,post){
                return response.redirect('back');
            })            // $pull is inbuilt {pull from where, what do I need to pull}
        }
        else{
            return response.redirect('back');
        }
    })
}