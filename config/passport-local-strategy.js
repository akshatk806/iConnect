const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

// Authentication using passport
// Sign-in the user
// Creating Authentication function -> We need to tell passport to use this local strategy that we created (we are telling the passport to use localstrategy in which we defining username field and after this there is a function with 3 arguments email,password and done the done is the callback function which is reporting back to passport),(Passport is using local strategy to find the user who is signed in)
passport.use(new LocalStrategy({
    usernameField:'email'                  // username field in the schema
    },
    function(email,password,done){         // done is a function which is inbuilt to passport

        // find the user and establish the identiy
        User.findOne({email:email},function(err,user){              //   {email in the model(schema), email passed in the function}
            if(err){
                console.log("Error in finding the user  ---> Passport");
                return done(err);                                   // Report an error to passport
            }

            if(!user || user.password!=password){
                console.log("Invalid username/password");
                return done(null,false);
            }

            // If user found then we pass the user
            return done(null,user)
        });             
    }
));


// Serializing the user to decide which key is to be kept in the cookies (You need to put userId in the cookie and not the rest of the information)
passport.serializeUser(function(user,done){
    done(null,user.id)
});

// Deserializing the user from the key in the cookies (When the cookie is sent back to the server and establish the identity that which user is there from the database we are using that id to find the user)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user  ---> Passport");
            return done(err); 
        }

        return done(null,user);
    });
});


// Sending data of signed-in current user to views

// Check the user is authenticated
passport.checkAuthentication=function(request,response,next){
    // if the user is signed-in, then pass on the request to the next function(controller's action)
    if(request.isAuthenticated()){
        return next ()                  // let the user view the page
    }
    // if the user is not signed-in
    return response.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(request,response,next){
    if(request.isAuthenticated()){
        // request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        response.locals.user=request.user
    }
    next()
}

module.exports=passport;