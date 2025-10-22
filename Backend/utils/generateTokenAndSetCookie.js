import jwt from "jsonwebtoken";


export const generateTokenAndSetCookie = (userId , res)=>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET_KEY , {
        expiresIn:"15d",
    })

res.cookie("token", token, {

  httpOnly: true,
  secure: true,
  sameSite: 'false', // important for cross-domain
  maxAge: 24*60*60*1000
});

}