import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";


import userRoutes from './routes/user.js'
import messageRoutes from './routes/message.js'
import v2Routes from './routes/group.js'
import { app, server } from "./SocletIo/server.js";
import V3routes from "./routes/AddUserRoutes.js"


dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials:true
}))

const port =process.env.PORT  || 3001 ;
const uri= process.env.MONGODB_URI;


try {
  mongoose.connect(uri)
  console.log("Connecteed to db")
} catch (error) {
  console.log(error); 
}

app.use('/api/user',userRoutes);
app.use('/api/message',messageRoutes)
app.use('/api/v2/group',v2Routes)
app.use('/api/v3',V3routes)


server.listen(port, ()=>{
  console.log(`server is running at port ${port}`);
})