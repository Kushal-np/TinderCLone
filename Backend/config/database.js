import mongoose from "mongoose"


export const connectDB = async() =>{
    try{
        const connect = mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")
    }
    catch(error){
        console.log("Server error")
        console.log(error.message)
    }
}