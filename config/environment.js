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
    jwt_secret:'iconnect'
}

const production={
    name:'production'
}

module.exports=development;