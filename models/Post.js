const  mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    post:Object,
    userName:String,
    uid:String,
    comments:[Object]
})
module.exports= mongoose.models.Post || mongoose.model('Post',postSchema);