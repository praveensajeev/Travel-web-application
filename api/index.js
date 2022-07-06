import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/room.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()


//mongodb connection

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to MongoDB');
    }catch(error){
        throw error
    }
}

//mongodb connection lost

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected!");
})

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected!");
})


//middlewares
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/room',roomsRoute)

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong";
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})

//server connecton
app.listen(8800,()=>{
    connect()
    console.log('Connected to backend.');
})