import express from "express "; 
const router = express.Router();


router.get("/profile/view", async(req , res) =>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(error){
        res.status(401).json({
            success:false , 
            message:"Couldn't react upto the user" , 
            error:error.message
        })
    }
})