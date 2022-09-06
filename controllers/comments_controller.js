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