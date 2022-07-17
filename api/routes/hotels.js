import express from 'express'
import { CountByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from '../controllers/hotelController.js';
import Hotel from '../models/hotelModel.js'
import { createError } from '../utils/error.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

//CREATE 
router.post('/',verifyAdmin,createHotel);
//UPDATE
router.put('/:id',verifyAdmin,updateHotel)
//DELETE
router.delete('/:id',deleteHotel);
//GET
router.get('/find/:id',getHotel);

//GET ALL
router.get('/',getAllHotels);
router.get('/CountByCity',CountByCity);
router.get('/CountByType',countByType);
router.get('/room/:id',getHotelRooms);

export default router