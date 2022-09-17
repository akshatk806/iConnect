// Worker - which is going to sent those emails for us instead of sending via controller

const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

queue.process('emails',function(job,done){            // queue.process('any name of the process',function)
    console.log('emails worker is processing a job ',job.data);

    commentsMailer.newComment(job.data);

    done();
})