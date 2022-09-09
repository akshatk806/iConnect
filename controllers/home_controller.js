const Post=require('../models/posts')
const User=require('../models/user')

module.exports.home=async function(request,response){
    try{
        // Populate the user of each post
        let posts=await Post.find({}).populate('user')
        .sort('-createdAt')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users=await User.find({});

        return response.render('home',{
            title:"iConnect | Home",
            posts:posts,
            all_users:users
        });

    }catch(err){
        console.log("Error:",err);
        return;
    }
}

// module.exports.actionName=function(request,response){}

