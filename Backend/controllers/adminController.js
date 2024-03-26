import asyncHandler from "express-async-handler";
import User from "../models/useModel.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from '../utils/cloudinary.js'

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
    const userData = await User.find({ isAdmin: { $ne: true } }).select('-password').sort({updatedAt:-1});
    res.status(200).json(userData);
   })

const updateUserDetail = asyncHandler(async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const user = await User.findById(req.body._id);
    if(user){

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                user.profileImage = result.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
            }
        }
    
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
    
        const updatedUser = await user.save()
    
        res.status(200).json({
           _id: updatedUser._id,
           name:updatedUser.name,
           email:updatedUser.email,
           profileImage:updatedUser.profileImage,
        });
        
    
       }else{
        res.status(404);
        throw new Error('User not found')
       }
})   

export {
    authAdmin,
    adminLogout,
    getUsers,
    updateUserDetail
   }