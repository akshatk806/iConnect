const express=require('express');
const environment=require('./config/environment');
const logger=require('morgan');
const port=8000;
const cookieParser=require('cookie-parser');
const app=express();
const path=require('path');

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

// Used for session cookie
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy.js');
const passportJWT=require('./config/passport-jwt-strategy.js');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash')
const customMiddleware=require('./config/middleware');

// Set up the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

if(environment.name=='development'){
    app.use(sassMiddleware({
        src:path.join(__dirname,environment.asset_path,'scss'),
        dest:path.join(__dirname,environment.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(environment.asset_path));

// Make the uploads path available to the browser 
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(environment.morgan.mode,environment.morgan.options));

app.use(expressLayouts);
// extract style sheets and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



// Middleware for session cookie, it takes the session cookie and encryptes it
// Mongo store is use to the session cookie in the db
app.use(session({
    name:'iConnect',    // name of the cookie
    secret:environment.session_cookie_key,   // TODO -> Change the secret before deploying at production
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

// using connect-flash
app.use(flash())
app.use(customMiddleware.setFlash);

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

// app.use() --> Hum App ko batate h ki yeh use karna h