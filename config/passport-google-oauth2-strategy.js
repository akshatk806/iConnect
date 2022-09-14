const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"108670182869-g60cqle6vsa452qnvs3rll0io7gi52pt.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        // Find the user 
        User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
            if(err){console.log("Error in google strategy passport",err); return; }

            console.log(profile);

            if(user){
                // if found, set this user as request.user 
                return done(null,user);
            }
            else{
                // user not found means sign up and set is as request.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log("Error in creating User google strategy passport",err); return; }

                    return done(null,user);
                });
            }
        })
    }
));

module.exports=passport;



