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

module.exports.update= async function(request,response){
    // if(request.user.id==request.params.id){                 // Authentication
    //     User.findByIdAndUpdate(request.params.id,request.body,function(err,user){
    //         return response.redirect('back')
    //     })
    // }
    // else{
    //     return response.status(401).send('Unauthorized')
    // }

    if(request.user.id==request.params.id){
        try {
            let user=await User.findById(request.params.id);
            User.uploadedAvatar(request,response,function(err){
                if(err){
                    console.log("******Multer Error",err);
                    return;
                }
                // console.log(request.file)
                user.name=request.body.name;
                user.email=request.body.email;

                if(request.file){
                    // saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+request.file.filename;
                } 
                user.save()
                return response.redirect('back');
            });
        } catch (error) {
            request.flash('error',error);
            return response.redirect('back')
        }
    }
    else{
        request.flash('error','Unauthorized');
        return response.status(401).send('Unauthorized');
    }
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

// Signing in the user, session is created in passport.js itself
module.exports.createSession=function(request,response){
    request.flash('success','Logged in Successfully');       // To pass on these messages to ejs template we create a middleware which fetches everything from request flash and passed it to locals
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
    request.flash('success','Logged out Successfully');      // To pass on these messages to ejs template we create a middleware which fetches everything from request flash and passed it to locals
    return response.redirect('/');
}