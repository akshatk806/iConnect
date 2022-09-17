const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

// create reusable transporter object using the default SMTP transport    (this is the part which sends email)
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,                     // port 587-for TLS and port 465-for SSL
    secure:false,
    auth:{
        user:'iconnectnodejs@gmail.com',
        pass:'fpft mzza oacc pjya'
    }
});

// We have to defined that we will using template rendering engine(ejs)
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err) {console.log("Error in rendering template"); return;}

            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}