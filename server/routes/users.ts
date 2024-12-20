/** 
 * 
 * ROUTERS FOR USER DATABASE
 * CRUD FUNCTIONALITY
 * 
 */

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../model.js";
import dotenv from "dotenv";
dotenv.config();
import { controller } from '../controllers/controller'
const router = express.Router();

// Get logged-in user, uses our controller middleware
router.get('/me', controller.verifyToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req as Request & { userId?: string };
    if (!userId) return res.status(401).json({ message: 'User ID not found in request.' });

    const user = await UserModel.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get specific User Route 
router.get('/:id', async (req: Request, res: Response) => {  
  try {  
    const { _id } = req.params;  
    const user = await UserModel.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found." });  
    const { password: _, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }  
});

// Get all Users Route  
router.get('/page', async (req: Request, res: Response) => {  
  try {  
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {  
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }  
}); 

// User Signup Route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { nickName, userName, password, accountType, email, field } = req.body;
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      nickName,
      userName,
      password: hashedPassword,
      accountType,
      email,
      field,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "UserName or Email already exists" });
    }

    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Update Router
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nickName, password, email, field } = req.body;

    if (!nickName && (!email && !password) && !field) {
      return res.status(400).json({ message: "Invalid input. Please provide fields to update." });
    }

    const updates: Partial<{ nickName: string; email: string; password: string ; field: string }> = {};
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 12);
    if (nickName) updates.nickName = nickName;
    if (field) updates.field = field;

    const userUpdate = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true }
    );

    if (!userUpdate) return res.status(404).json({ message: "User not found." });

    const { password: _, ...updatedUser } = userUpdate.toObject();
    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Router
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDelete = await UserModel.findByIdAndDelete({ _id: id });

    if(!userDelete) return res.status(404).json({message: "Unable to delete user."});

    const { ...userData } = userDelete.toObject();
    res.status(200).json({ message: "User deleted successfully", user: `${userData}` });
  } catch (error) {
    console.error("Deletion Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

