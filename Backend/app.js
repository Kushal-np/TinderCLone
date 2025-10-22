import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRoutes from "./routes/auth.js"
import profileRoutes from "./routes/profile.js"
import requestRoutes from "./routes/request.js"
import userRoutes from "./routes/user.js"
import { connectDB } from './config/database.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://sparkoooo.onrender.com",
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS" , "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use("/auth" , authRoutes)
app.use("/profile" , profileRoutes)
app.use("/request" , requestRoutes)
app.use("/user" , userRoutes)
app.listen( PORT, ()=>{
    console.log(`Server is already running on port ${PORT}`);
    connectDB();
})