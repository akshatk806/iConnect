// This is a action
module.exports.home=function(request,respone){
    // respone.end('<h1>Express is up for iConnect</h1>');   // this line will sent directly to the browser

    console.log(request.cookies)
    respone.cookie('user_id',25);   // change the cookie
    respone.render('home',{
        title:"Home"
    })
}