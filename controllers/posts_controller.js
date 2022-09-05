const Post=require('../models/posts')

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