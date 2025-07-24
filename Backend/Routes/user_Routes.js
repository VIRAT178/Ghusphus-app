import express from 'express'
import { checkAuth, login, Signup, updateProfile } from '../controller/user_Controller.js'
import { protectRoute } from '../Middlewares/auth.js';

const userRouter = express.Router();
userRouter.post("/signup", Signup);
userRouter.post("/login" , login);
userRouter.put("/updateProfile", protectRoute,updateProfile);
userRouter.get("/check" , protectRoute , checkAuth);

export default userRouter;