import asyncHandler from "express-async-handler";
import User from "../models/useModel.js";
import generateToken from "../utils/generateToken.js";

const authAdmin = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;

    const admin = await User.findOne({email});

    if(admin && admin.isAdmin && (await admin.matchPassword(password))){
        generateToken(res,admin._id,'adminJwt');
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            profileImage:admin.profileImage,

        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

const adminLogout=asyncHandler(async(req,res)=>{


    res.cookie('adminJwt','',{
           httpOnly:true,
           expires:new Date(0)
       })
   
       res.status(200).json({message:'Admin logged out'})
   
   })

const getUsers = asyncHandler(async(req,res)=>{
    const userData = await User.find({ isAdmin: { $ne: true } }).select('-password');
    res.status(200).json(userData);
   })

export {
    authAdmin,
    adminLogout,
    getUsers
   }