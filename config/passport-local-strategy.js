const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

// Authentication using passport
// Sign-in the user
// Creating Authentication function -> We need to tell passport to use this local strategy that we created (we are telling the passport to use localstrategy in which we defining username field and after this there is a function with 3 arguments email,password and done the done is the callback function which is reporting back to passport),(Passport is using local strategy to find the user who is signed in)
passport.use(new LocalStrategy({
        usernameField:'email',                  // username field in the schema
        passReqToCallback:true                  // This allow us to make first argument is request
    },
    function(request,email,password,done){         // done is a function which is inbuilt to passport, done is reporting back to password

        // find the user and establish the identiy
        User.findOne({email:email},function(err,user){              //   {email in the model(schema), email passed in the function}
            if(err){
                request.flash("error",err);
                return done(err);                                   // Report an error to passport
            }

            if(!user || user.password!=password){
                request.flash('error','Invalid Username/Password');
                return done(null,false);                           // done() it has 2 arguments , the 1st one is err-> if error or null-> if no error and the 2nd argument is false -> if authentication fails ot user-> if authentication successfull
            }

            // If user found then we pass the user
            return done(null,user)
        });             
    }
));


// Serializing the user to decide which key is to be kept in the cookies (In manual Authentication you need to put user_id in the cookie and not the rest of the information as response.cookie('user_id',user.id))
passport.serializeUser(function(user,done){
    done(null,user.id)     // user is already passed in line 28 and this automatically encryptes the id
});

// Deserializing the user from the key in the cookies (When the cookie is sent back to the server and establish the identity that which user is there from the database we are using that id to find the user so that is desearializing)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user  ---> Passport");
            return done(err); 
        }

        return done(null,user);        // null because no error and user because user is found
    });
});


// Sending data of signed-in current user to views

// Middleware to check the user is signed-in or not
// Check the user is authenticated, We use this function as a middleware however it is not inbuilt function to passport
passport.checkAuthentication=function(request,response,next){
    // if the user is signed-in, then pass on the request to the next function(controller's action)
    if(request.isAuthenticated()){
        return next();                  // let the user view the page, if the user is signed-in passing it to the page
    }
    // if the user is not signed-in
    return response.redirect('/users/sign-in');
}

// Set the user for view
passport.setAuthenticatedUser=function(request,response,next){
    if(request.isAuthenticated()){
        // request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        response.locals.user=request.user
    }
    next()
}

module.exports=passport;