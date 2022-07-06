import Room from '../models/roomModel.js'
import Hotel from '../models/hotelModel.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req,res,next)=>{
    
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)
    try{
         const savedRooms = await newRoom.save()
         try{
           await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRooms._id}})
       }catch(error){
           next(error)
       }
       res.status(200).json(savedRooms)
    }catch(error){
        next(error)
    }
};



//update hotel
export const updateRoom = async (req,res,next)=>{
    try{
       const updatedHotel = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).json(updatedHotel)
    }catch(error){
     next(error)
    }
}

//delete hotel

export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            })
        }catch(error){
            next(error)
        }
       res.status(200).json("room deleted successfully")
    }catch(error){
     next(error)
    }
}

//get One hotel

export const getRoom = async (req,res,next)=>{
    try{
       const getHotel = await Hotel.findById(req.param.id)
       res.status(200).json(getHotel)
    }catch(error){
     next(error)
    }
}

//get All hotels
export const getAllRooms = async (req,res,next)=>{


    try{
       const getAllHotel = await Hotel.find()
       res.status(200).json(getAllHotel)
    }catch(error){
     next(error)
    }
}