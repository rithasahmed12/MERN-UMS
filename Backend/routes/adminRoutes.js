import express from 'express';
const adminRouter = express.Router();
import { 
    authAdmin,
    adminLogout,
    getUsers,
    updateUserDetail
 } from "../controllers/adminController.js";
import { adminProtect } from '../middleware/adminAuthMiddleware.js';
import upload from '../middleware/multer.js';


adminRouter.post('/',authAdmin);
adminRouter.post('/logout',adminLogout);
adminRouter.get('/users',adminProtect,getUsers);
adminRouter.put('/profile',upload.single('image'),updateUserDetail)

export default adminRouter