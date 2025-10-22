import express from "express";
const router = express.Router();
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { userAuth } from "../middlewares/auth.js";
router.post("/signup" , async(req , res)=>{
    try{
        console.log("So here we hit")
        validateSignUpData(req);

        const {firstName , lastName , emailId , password } = req.body;
        console.log(lastName)
        const hashedPassword = await bcrypt.hash(password , 10);
        console.log(hashedPassword);
        const user = new User({
            firstName, 
            lastName , 
            emailId , 
            password:hashedPassword
        })
        if(user){
            generateTokenAndSetCookie(user._id , res) ; 
            await user.save();

            res.status(201).json(user);
        }
        else{
            res.status(400).json({
                success:false , 
                message:"Your Message Couldn't react to the server"  
            })
        }
        
    }
    catch(error){
        res.status(500).json({
            success:false , 
            message:"Internal server error "  , 
            error:error.message
        })
    }
})
router.post("/login" , async(req , res)=>{
    try{
        const {emailId , password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = bcrypt.compare(password , user.password);
        if(isPasswordValid){
            generateTokenAndSetCookie(user._id , res);
            res.send(user)
        }
        else{
            throw new Error("Invalid credentials")
        }
    }
    catch(error){
        res.status(400).json({
            success:false , 
            message:"Internal server error" , 
            error:error.message
        })
    }
})

router.post("/logout" , async(req , res)=>{
    try{
        res.cookie("token" , null , {
            maxAge:0 , 
            expires: new Date(Date.now())
        })

        res.send("Logout successfull");
    }
    catch(error){
        res.status(501).json({
            success:false , 
            message:"Internal server error" , 
            error:error.message
        })
    }


})

router.get("/me" , userAuth, async(req , res)=>{
    const me = req.user
    res.status(200).json(me);
})
export default router ; 



//68f3bb7b034d619a2c51de35 -> kush  "emailId": "Kushalpoude1l@gmail.com",


//68f4b4e7a3942050c3658a5b -> arijit email id = arijit@gmail.com
