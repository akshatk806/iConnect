const User=require('../models/users')

module.exports.profile=function(request,respone){
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id,function(err,user){
            // if user is found redirect to profile page
            if(user){
                return respone.render('profile',{
                    title:"User Profile",
                    user:user
                })
            }
            else{
                return respone.redirect('/users/sign-in')
            }
        })
    }
    else{
        return respone.redirect('/users/sign-in')
    }
}


module.exports.posts=function(request,respone){
    return respone.render('posts',{
        title:"iConnect | Posts"
    })  
}

// render the signup page
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

// get the sign in data
module.exports.createSession=function(request,respone){
    // steps to authenticate
    // find the user 
    User.findOne({
        email:request.body.email
    },function(err,user){
        if(err){
            console.log("Error in finding user in signing in");
            return err;
        }

        // handle user found
        if(user){
            // handle password which doen't match
            if(user.password!=request.body.password){
                return respone.redirect('back');
            }

            // handle session creation
            respone.cookie('user_id',user.id);
            return respone.redirect('/users/profile')
        }
        else{
            // handle user not found
            return respone.redirect('back')
        }
    })
}

// Sign Out
module.exports.destroySession=function(request,respone){
    User.findOne({
        email:request.body.email
    },function(err,user){
        if(err){
            console.log("Error in signing out");
            return err;
        }
        respone.clearCookie("user_id");
        respone.redirect('/users/sign-in');
    });
    
}   