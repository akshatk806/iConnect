module.exports.about=function(request,respone){
    return respone.render('about',{
        title:"About"
    })
}