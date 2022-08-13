module.exports.home=function(request,respone){
    // respone.end('<h1>Express is up for iConnect</h1>');   // this line will sent directly to the browser
    respone.render('home',{
        title:"Home"
    })
}