const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const environment=require('./environment');

// create reusable transporter object using the default SMTP transport    (this is the part which sends email)
let transporter=nodemailer.createTransport(environment.smtp);

// We have to defined that we will using template rendering engine(ejs)
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err) {console.log("Error in rendering template",err); return;}

            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}