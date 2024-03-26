import express from 'express';
const adminRouter = express.Router();
import { 
    authAdmin,
    adminLogout,
    getUsers,
    updateUserDetail,
    addNewUser,
    deleteUser
 } from "../controllers/adminController.js";
import { adminProtect } from '../middleware/adminAuthMiddleware.js';
import upload from '../middleware/multer.js';



adminRouter.post('/',authAdmin);
adminRouter.post('/logout',adminLogout);

adminRouter
    .route('/users')
    .get(adminProtect,getUsers)
    .post(adminProtect,upload.single('image'),addNewUser)
    .delete(adminProtect,deleteUser);

adminRouter.put('/profile',adminProtect,upload.single('image'),updateUserDetail);


export default adminRouter