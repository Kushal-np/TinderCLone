import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRoutes from "./routes/auth.js"
import profileRoutes from "./routes/profile.js"
import { connectDB } from './config/database.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())



app.use("/auth" , authRoutes)
app.use("/profile" , profileRoutes)
app.listen( PORT, ()=>{
    console.log(`Server is already running on port ${PORT}`);
    connectDB();
})