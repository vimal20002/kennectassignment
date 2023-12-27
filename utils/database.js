import mongoose from "mongoose";
var DB_URI="mongodb+srv://skk180509:vimal9517@cluster0.roasvng.mongodb.net/?retryWrites=true&w=majority";
export const connectToDb=async ()=>{
    try {
        mongoose.connect(DB_URI)
        .then(()=>{
            console.log("connected to db")
        })
        .catch(()=>{
            console.log("connection failed")
        })
    } catch (error) {
        console.log(error)
    }
}
