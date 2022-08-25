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

module.exports=passport;