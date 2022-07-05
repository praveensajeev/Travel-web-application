import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/room.js'
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
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/room',roomsRoute)

//server connecton
app.listen(8800,()=>{
    connect()
    console.log('Connected to backend.');
})