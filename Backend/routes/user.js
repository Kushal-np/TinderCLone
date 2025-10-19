import express from "express"
import { userAuth } from "../middlewares/auth";
import connectionRequest from "../models/connectionRequest";
import User from "../models/user";
const router = express.Router();

router.get("/requests/recieved" , userAuth , async(req , res)=>{
    try{
        const loggedInUser = req.user ; 

        const connectionRequests = await connectionRequest.find({
            toUserId : loggedInUser.id ,
            status:"interested",
        }).populate("fromUserId" , "firstName lastName photoUrl age gender about skills");

        res.status(201).json({
            message:"Data fetched successfully",
            data:connectionRequests,
        });
    }
    catch(error){
        res.status(400).send(error.message);
    }
})


router.get("/connections" , userAuth , async(req , res) =>{
    try{
        const loggedInUser = req.user ; 

        const connectionRequests = await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id , status:"accepted"},
            ],
        }).populate("fromUserId","firstName lastName photoUrl age gender about skills")
          .populate("toUserId" , "firstName lastName photoUrl age gender about skills")

        console.log(connectionRequests);
        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId ; 
            }
            return row.fromUserId ;
        });
        res.json({data});
    }
    catch(error){
        res.status(404).send({message:error.message});       
    }
})

router.get("/feed" , userAuth , async(req , res) =>{
    try{
        const loggedInUser = req.user ; 
        const page = parseInt(req.query.page) || 1 ; 
        let limit = parseInt(req.query.limit) || 10 ; 
        limit = limit > 50 ? 50 : limit ; 
        const skip = (page-1) * limit ; 

        const connectionRequests = await connectionRequest.find({
            $or:[{fromUserId:loggedInUser._id} , {toUserId:loggedInUser._id}],
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ]
        }).select("firstName lastName photoUrl age gender about skills")
          .skip(skip)
          .limit(limit);

        res.json({data:users});
    }   
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


export default router ; 