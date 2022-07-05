import Hotel from '../models/hotelModel.js'


//create hotel
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
       const savedHotel = await newHotel.save()
       res.status(200).json(savedHotel)
    }catch(error){
     next(error)
    }
}

//update hotel
export const updateHotel = async (req,res,next)=>{
    try{
       const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).json(updatedHotel)
    }catch(error){
     next(error)
    }
}

//delete hotel

export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findById(req.params.id)
       res.status(200).json("deleted successfully")
    }catch(error){
     next(error)
    }
}

//get One hotel

export const getHotel = async (req,res,next)=>{
    try{
       const getHotel = await Hotel.findById(req.param.id)
       res.status(200).json(getHotel)
    }catch(error){
     next(error)
    }
}

//get All hotels
export const getAllHotels = async (req,res,next)=>{


    try{
       const getAllHotel = await Hotel.find()
       res.status(200).json(getAllHotel)
    }catch(error){
     next(error)
    }
}