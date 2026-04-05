import { Router } from "express";
import {signin, signup,verifyEmail,getMyProfile,updateUser,deleteAccount,getAllUsers}from "../Controllers/auth.controllers.js"
import { auth } from "../middlewares/auth.middleware.js";
const authRouter=Router();
authRouter.post("/signup",signup);
authRouter.get("/verify/:id", verifyEmail);
authRouter.post("/signin",signin);
authRouter.get("/profile", auth, getMyProfile);
authRouter.put("/update", auth, updateUser);
authRouter.delete("/delete", auth, deleteAccount);
authRouter.get("/all", auth, getAllUsers);
export default authRouter;
