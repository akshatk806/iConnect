const express=require('express');
const port=8000;
const app=express();

// use express router (from routes/index.js)
app.use('/',require('./routes/index.js'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error occured in firing up the express server:",err);
        return;
    }
    console.log("The express server is up and running on port:",port)
});