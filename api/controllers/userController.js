import User from '../models/userModel.js'


//update User
export const updateUser = async (req,res,next)=>{
    try{
       const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).json(updatedUser)
    }catch(error){
     next(error)
    }
}

//delete User
export const deleteUser = async (req,res,next)=>{
  try {
    
    await User.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
//get One User

export const getUser = async (req,res,next)=>{
    try{
       const getUser = await User.findById(req.param.id)
       res.status(200).json(getUser)
    }catch(error){
     next(error)
    }
}

//get All Users
export const getAllUsers = async (req,res,next)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }