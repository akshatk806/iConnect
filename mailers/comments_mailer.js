const nodeMailer=require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment=(comment)=>{

    console.log("Inside newComment:",comment);
    nodeMailer.transporter.sendMail({
        from:"iConnect.com",
        to:comment.user.email,
        subject:"New Comment published",
        html:"<h1>Yup, your comment is now published!</h1>"
    },(err,info)=>{
        if(err) {console.log("Error in sending mail",err); return}

        console.log("Mail delivered",info);
        return;
    });
}