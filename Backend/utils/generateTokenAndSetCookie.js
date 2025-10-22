import jwt from "jsonwebtoken";


export const generateTokenAndSetCookie = (userId , res)=>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET_KEY , {
        expiresIn:"15d",
    })

res.cookie("token", token, {
    domain:"https://sparko-seven.vercel.app/" , 
    path:"/",
  httpOnly: true,
  secure: true,
  sameSite: 'false', // important for cross-domain
  maxAge: 24*60*60*1000
});

}