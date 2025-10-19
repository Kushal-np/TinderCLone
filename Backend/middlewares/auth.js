import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await User.findById(decodedObj.userId);
        console.log("This is your user: " , user)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        console.log("Forwarding beyond auth middleware");
        next(); 
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed at authMiddleware",
            error: error.message,
        });
    }
};
