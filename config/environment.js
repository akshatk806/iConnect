const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'iConnect',
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,                     // port 587-for TLS and port 465-for SSL
            secure:false,
            auth:{
                user:'iconnectnodejs@gmail.com',
                pass:'fpft mzza oacc pjya'
            }
    },
    google_client_id:"108670182869-g60cqle6vsa452qnvs3rll0io7gi52pt.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'iconnect',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    asset_path:process.env.ICONNECT_ASSET_PATH,
    session_cookie_key:process.env.ICONNECT_SESSION_COOKIE_KEY,
    db:process.env.ICONNECT_DB,
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,                     // port 587-for TLS and port 465-for SSL
            secure:false,
            auth:{
                user:process.env.ICONNECT_GMAIL_USERNAME,
                pass:process.env.ICONNECT_GMAIL_PASSWORD
            }
    },
    google_client_id:process.env.ICONNECT_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.ICONNECT_GOOGLE_CLIENT_SECRET,
    google_callback_URL:process.env.ICONNECT_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.ICONNECT_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

// when we have to run in development environment
//module.exports=development 

// when we have to run in production environment
module.exports=eval(process.env.ICONNECT_ENVIRONMENT)==undefined?development:eval(process.env.ICONNECT_ENVIRONMENT);