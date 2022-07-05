import express from 'express'

const router = express.Router();


router.get('/',(req,res)=>{
    res.send("hello this is iam route")
})


router.get('/',(req,res)=>{
    res.send("hello this is iam route")
})


export default router