const Post=require('../../../models/posts')
const Comment=require('../../../models/comment')

module.exports.index=async function(request,response){
    
    let posts=await Post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    
    return response.json(200,{
        message:"Lists of posts",
        posts:posts
    });
}


module.exports.delete=async function(request,response){

    try{
        let post=await Post.findById(request.params.id);
    
        if(post.user == request.user.id){
            post.remove();
            
            await Comment.deleteMany({post:request.params.id})

            return response.json(200,{
                message:"Post and associated comment delete successfully"
            });
        }
        else{
            return response.json(401,{
                message:"You cannot delete this post!"
            })
        }
    }catch(err){
        console.log(err);
        response.json(500,{
            message:"Internal server error"
        })
    }
}