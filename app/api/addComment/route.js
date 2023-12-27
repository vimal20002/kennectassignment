import { connectToDb } from "@utils/database";
const Post = require("@models/Post.js");
export const POST = async(req, res)=>{
try {
    await connectToDb();
    const body = await req.json();
    console.log(body)
    const {id, username, comment} =body;
    const post = await Post.findById(id);
    console.log(post)
    const arr = post.comments;
    arr.push({username, comment})
    post.comments = arr;
    await post.save();
    console.log(post);
    return new Response(JSON.stringify({message:"Comment added sucessfully"}),{status:201});

} catch (error) {
    console.log(error)
    return new Response(JSON.stringify({message:"Error occured"}),{status:404});

}
}