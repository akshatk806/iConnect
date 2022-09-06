const Post=require('../models/posts')
const User=require('../models/user')

module.exports.home=function(request,response){
    // respone.end('<h1>Express is up for iConnect</h1>');   // this line will sent directly to the browser


    // find all the posts
    // Post.find({},function(err,posts){
    //     return response.render('home',{
    //         title:"iConnect | Home",
    //         posts:posts
    //     })
    // })

    // Populate the user of each post
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,posts){
        User.find({},function(err,users){
            return response.render('home',{
                title:"iConnect | Home",
                posts:posts,
                all_users:users
            })
        })
    })

    // respone.render('home',{
    //     title:"Home"
    // })
}

// module.exports.actionName=function(request,response){}

