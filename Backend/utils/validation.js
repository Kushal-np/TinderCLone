import validator from "validator"
export const validateSignUpData = (req) =>{
    const {firstName , lastName , emailId , password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is invalid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

export const validateProfileData = (req) =>{
    const allowedEditProfile = [
        "firstName" , 
        "lastName" , 
        "emailId" , 
        "photoUrl" , 
        "gender" , 
        "age",
        "skills",
        "about"
    ]
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedFields.includes(field));
    return isEditAllowed ;    
}