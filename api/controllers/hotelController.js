import Hotel from '../models/hotelModel.js'
import Room from '../models/roomModel.js'

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
        await Hotel.findByIdAndDelete(req.params.id)
       res.status(200).json("deleted successfully")
    }catch(error){
     next(error)
    }
}

//get One hotel

export const getHotel = async (req,res,next)=>{
    try{
       const getHotel = await Hotel.findById(req.params.id)
       res.status(200).json(getHotel)
    }catch(error){
     next(error)
    }
}

//get All hotels
export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
//Count By City
export const CountByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
      const list = await Promise.all((cities.map(city=>{
        return Hotel.countDocuments({city:city})
      })))
      res.status(200).json(list)
    }catch(err){

        next(err)

    }
}
//Count By Type
export const countByType = async (req,res,next)=>{
  
    try{
        const hotelCounnt =await Hotel.countDocuments({type:"hotel"})
        const apartmentCount =await Hotel.countDocuments({type:"apartment"})
        const resortCount =await Hotel.countDocuments({type:"resort"})
        const villasCount =await Hotel.countDocuments({type:"villa"})
        const cabinCount =await Hotel.countDocuments({type:"cabin"})
      res.status(200).json([
        {type:"hotel",count:hotelCounnt},
        {type:"apartment",count:apartmentCount},
        {type:"resort",resortCount},
        {type:"villa",count:villasCount},
        {type:"cabin",cabinCount}
      ])
    }catch(err){

        next(err)

    }
}

//selecting room

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};