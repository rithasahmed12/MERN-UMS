import express from 'express';
const adminRouter = express.Router();
import { 
    authAdmin,
    adminLogout,
    getUsers,
 } from "../controllers/adminController.js";
import { adminProtect } from '../middleware/adminAuthMiddleware.js';


adminRouter.post('/',authAdmin);
adminRouter.post('/logout',adminLogout);
adminRouter.get('/users',adminProtect,getUsers);

export default adminRouter