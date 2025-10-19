import mongoose from "mongoose" 

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{

    },
    toUserId:{

    },
    status:{
        type:String, 
        required:true , 
        enum:{
            values:["ignored","interested","accepted" ,"rejected" ],
            message:`{VALUE} is incorrect`
        },
    },
},
{timestamps:true});

connectionRequestSchema.index({fromUserId: 1, toUserId:1} , {unique:true});
connectionRequestSchema.pre("save" , function(next){
    const connectionRequest = this ; 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})
const User = mongoose.model("connectionRequest" , connectionRequestSchema);
export default User ; 