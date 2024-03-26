import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/useModel.js';

const adminProtect = asyncHandler(async(req,res,next)=>{
    let token;

    token = req.cookies.adminJwt;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.admin = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token hahah');  
    }
})

export {adminProtect};