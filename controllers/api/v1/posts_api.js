module.exports.index=function(request,response){
    return response.json(200,{
        message:"Lists of posts",
        posts:[]
    });
}