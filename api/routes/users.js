import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

router.get("/checkauth",verifyToken,(req,res,next)=>{
    res.send("hello user you are loggedin")
})


//UPDATE
router.put('/:id',updateUser)
//DELETE
router.delete('/:id',deleteUser);
//GET
router.get('/:id',getUser);

//GET ALL
router.get('/',getAllUsers);


export default router