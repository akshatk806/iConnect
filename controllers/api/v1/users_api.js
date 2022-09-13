const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(request,response){

    try {
        let user=await User.findOne({email:request.body.email});

        if(!user || user.password!=request.body.password){
            return response.json(422,{
                message:"Invalid username/password"
            });
        }

        if(user){
            return response.json(200,{
                message:"Sign in Successfully, here is your token please keep your token safe!",
                data:{
                    token:jwt.sign(user.toJSON(),'iconnect',{expiresIn:'10000'})              // Generating a token
                }
            })
        }

    } catch (error) {
        console.log('********',error);
        return response.json(500,{
            message:"Interval Server Error"
        })
    }

}