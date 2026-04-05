import { userModel } from "../Models/User.model.js";
import { sendEmail } from "../utils/email.js";
import { hashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { asyncHandler } from "../utils/asyncHandler.js";

// Sign up
export const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, age } = req.body;
    
    const isExist = await userModel.findOne({ email });
    if (isExist) {
        return res.status(409).json({ message: "Email already exists! Try to login." });
    }

    const hashedPassword = hashPassword(password);
    const newUser = await userModel.create({
        name, email, password: hashedPassword, age
    });

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <h1 style="color: #4CAF50;">Welcome to Task Manager, ${name}! </h1>
            <p>Please click the button below to verify your account:</p>
            <a href="http://localhost:3000/verify/${newUser._id}" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
               Verify My Email
            </a>
        </div>
    `;
    await sendEmail(email, "Confirm Your Email ", htmlContent);

    res.status(201).json({ message: "Done! Check your email to verify." });
});

//  Verify Email
export const verifyEmail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, { confirmEmail: true });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).send("<h1>Email verified </h1>");
});

//  Sign in
export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found, please signup first" });
    }

    if (user.confirmEmail == false) {
        return res.status(400).json({ message: "Email not confirmed, please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Wrong password!" });
    }


const token = jwt.sign(
    { id: user._id, email: user.email },
    "MarwaKey",
    { expiresIn: '1h' }
);


res.status(200).json({ 
    message: "Welcome! Login successful", 
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
});
});

//  Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find().select("name email");
    res.status(200).json({ users });
});

//  Get My Profile
export const getMyProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
});

//  Update User
export const updateUser = asyncHandler(async (req, res) => {
    const { name, age } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
        req.user.id,
        { name, age },
        { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile Updated! ", updatedUser });
});

//  Delete Account
export const deleteAccount = asyncHandler(async (req, res) => {
    await userModel.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Account Deleted!" });
});