const User = require("@models/User.js");
var jwt = require('jsonwebtoken');

const { connectToDb } = require("@utils/database");

export const POST = async(req)=>{
    
    try {
        await connectToDb();
        const body = await req.json();
        const {email, password,name} = body;
        console.log(body)
        const user = await User.findOne({email:email});
        if(user && user.password === password)
        {
            const token =  jwt.sign({uid:user._id},process.env.SECRET_KEY,{ expiresIn:'2d'})
            console.log(token)
            return new Response(JSON.stringify({name:user.name, uid:user._id, token}), {status:200})
        }
        else{
            const nuser = await new User({name})
            await nuser.save();
            const token =  jwt.sign({uid:nuser._id},process.env.SECRET_KEY,{ expiresIn:'2d'})
            return new Response(JSON.stringify({nuser, uid:nuser._id, token}), {status:201})
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:"Erorrrrr"}), {status:400})

    }
}