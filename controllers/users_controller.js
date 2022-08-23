module.exports.profile=function(request,respone){
    respone.render('profile',{
        title:"iConnect | Profile"
    })
}
module.exports.posts=function(request,respone){
    respone.render('posts',{
        title:"iConnect | POSTS"
    })
}

module.exports.signup=function(request,respone){
    return respone.render('user_sign_up',{
        title:"iConnect | Signup"
    })      
}

module.exports.signin=function(request,respone){
    return respone.render('user_sign_in',{
        title:"iConnect | Signin"
    })
}