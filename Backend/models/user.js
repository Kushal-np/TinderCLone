import mongoose from "mongoose"
import validator from "validator"


const userSchema = new mongoose.Schema({
    firstName:{
        type:String , 
        required:true , 
        minLength:4 , 
        maxLength : 50 , 
    },
    lastName:{
        type:String ,
    },
    emailId:{
        type:String , 
        lowerCase:true , 
        required:true , 
        unique:true , 
        trim:true , 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address : "+value);
            }
        }
    },
    password:{
        type:String , 
        required:true , 
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password: "+value);
            }
        }
    },
    age:{
        type:Number , 
        min:18 , 
    },
    gender:{
        type:String , 
        enum:{
            values:["male" , "female" , "others"],
            message:`{VALUE} is not a valid gender type`
        },
    },
    isPremium:{
        type:Boolean , 
        default:false , 
    },
    membershipType:{
        type:String , 
    },
    photoUrl:{
        type:String , 
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url" + value);
            }
        }
    },
    about:{
        type:String, 
        default:"This is a default about of the user" , 
    },
    skills:{
        type:[String] ,
    },

},
{
    timestamps:true,
})

const User = mongoose.model("User", userSchema)
export default User ;