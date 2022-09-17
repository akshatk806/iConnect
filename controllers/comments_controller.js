const Comment=require('../models/comment')
const Post=require('../models/posts')
const commentsMailer=require('../mailers/comments_mailer');

module.exports.create=async function(request,response){
    try{
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
    
            request.flash('success','Comment Published!');
            response.redirect('/');
        }
    }catch(err){
        request.flash('error',err)
        return
    }
}

module.exports.delete=async function(request,response){
    try {
        let comment=await Comment.findById(request.params.id);
        if(comment.user==request.user.id){
            let postId=comment.post

            comment.remove()

            let post=Post.findByIdAndUpdate(postId,{$pull:{comments:request.params.id}});            // $pull is inbuilt {pull from where, what do I need to pull}

            request.flash('success','Comment deleted!');
            return response.redirect('back');
        }
        else{
            request.flash('error','Unauthorized!');
            return response.redirect('back');
        }
    } catch (error) {
        request.flash('error',err)
        return
    }
}