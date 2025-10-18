import express from "express "; 
import { userAuth } from "../middlewares/auth";
import { validateProfileData } from "../utils/validation";
const router = express.Router();


router.get("/profile/view", userAuth,  async(req , res) =>{
try{
        const user = req.user;
        res.send(user);
    }
    catch(error){
        success:false , 
        res.status(401).json({
        message:"Couldn't react upto the user" , 
            error:error.message
        })
    }
})
//View logic
router.patch("/profile/view" , userAuth , async(req , res)=>{
    try{
        if(!validateProfileData(req)){
            throw new Error("Please enter valid input ")
        }
        const loggedInUser = req.user;

    }
    catch(error){

    }
} )