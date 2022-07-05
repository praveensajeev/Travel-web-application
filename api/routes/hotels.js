import express from 'express'
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from '../controllers/hotelController.js';
import Hotel from '../models/hotelModel.js'
import { createError } from '../utils/error.js';


const router = express.Router();

//CREATE 
router.post('/',createHotel);
//UPDATE
router.put('/:id',updateHotel)
//DELETE
router.delete('/:id',deleteHotel);
//GET
router.get('/:id',getHotel);

//GET ALL
router.get('/',getAllHotels);

export default router