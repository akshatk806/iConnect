const express=require('express');
const port=8000;
const app=express();

// use express router (from routes/index.js)
app.use('/',require('./routes/index.js'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,(err)=>{
    if(err){
        console.log("Error occured in firing up the express server:",err);
        return;
    }
    console.log("The express server is up and running on port:",port)
});