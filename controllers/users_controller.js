const User = require('../models/user')

// All these are actions
module.exports.profile=function(request,respone){
    User.findById(request.params.id,function(err,user){
        respone.render('profile',{
            title:"iConnect | Profile",
            profile_user:user
        })
    })
}
module.exports.posts=function(request,respone){
    respone.render('posts',{
        title:"iConnect | POSTS"
    })
}

// render the signup page and restrict the user if user is logged-in then the signup and signin page is not visible to that user
module.exports.signup=function(request,respone){
    if(request.isAuthenticated()){
        return respone.redirect('/users/profile')
    }
    return respone.render('user_sign_up',{
        title:"iConnect | Signup"
    })      
}

module.exports.signin=function(request,respone){
    if(request.isAuthenticated()){
        return respone.redirect('/users/profile')
    }
    return respone.render('user_sign_in',{
        title:"iConnect | Signin"
    })
}

// get the sign up data
module.exports.create=function(request,respone){
    if(request.body.password!=request.body.cpassword){
        return respone.redirect('back');
    }
    User.findOne({
        email:request.body.email
    },function(err,user){
        if(err){
            console.log("Error in finding user in signing up");
        }
        if(!user){
            User.create(request.body,function(err,user){
                if(err){
                    console.log("Error in creating the user while signing up");
                    return;
                }
                return respone.redirect('/users/sign-in')
            })
        }
        else{
            return respone.redirect('back');
        }
    })
}

// Signing in the user
module.exports.createSession=function(request,response){
    return response.redirect('/');
}

// Sign out
module.exports.destroySession=function(request,response,next){
    request.logout(function(err){
        if(err){
            console.log("Error in logging-out");
            return;
        }
    });
    return response.redirect('/users/sign-in');
}