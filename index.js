const express=require('express');
const port=8000;
const cookieParser=require('cookie-parser');
const app=express();

const db=require('./config/mongoose');

// Used for session cookie
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy.js');
const MongoStore=require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



// Middleware for session cookie
// Mongo store is use to the session cookie in the db
app.use(session({
    name:'iConnect',    // name of the cookie
    secret:'blahsomething',   // TODO -> Change the secret before deploying at production
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)       // maxAge is in milliseconds
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost',
            dbName:'iConnect',
            stringify:false,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use express router (from routes/index.js)
app.use('/',require('./routes/index.js'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error occured in firing up the express server:",err);
        return;
    }
    console.log("The express server is up and running on port:",port)
});

// Please take care the order of all middlewares