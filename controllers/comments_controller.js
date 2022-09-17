const Comment=require('../models/comment')
const Post=require('../models/posts')
const commentsMailer=require('../mailers/comments_mailer');

module.exports.create=async function(request,response){
    let post=await Post.findById(request.body.post);
    if(post){
        let comment=await Comment.create({
            content:request.body.content,
            post:request.body.post,
            user:request.user._id
        });
        post.comments.push(comment);
        post.save();

        comment=await Comment.findOne({user:request.user._id}).populate('user','name email').exec();
        
        // console.log("Comments in comment_controller:",comment);
        commentsMailer.newComment(comment);

        response.redirect('/');
    }
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