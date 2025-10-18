import jwt from "jsonwebtoken"
import User from "../models/user"

export const userAuth = async(req , res , next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            res.status(401).json({
                message:"Please Login"
            })
        }
        const decodedObj = await jwt.verify(token , process.env.JWT_SECRET_KEY)
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(user){
            throw new Error("User not found")
        }
        req.user = user ; 
        next();
    }   
    catch(error){
        res.status(400).json({
            success:false , 
            message:"Failed at authMiddleware" , 
            error:error.message
        })
    }
}