import express from "express";
import bcrypt from "bcrypt"; // needs `npm i --save-dev @types/bcrypt`
import jwt from "jsonwebtoken"; // needs `npm install jsonwebtoken`
import { Request, Response } from "express";
import UserModel from "../model.ts"; // Import the User schema

const router = express.Router();

// User Signup Route
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { nickName, userName, password, accountType, email } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new UserModel({
            nickName,
            userName,
            password: hashedPassword,
            accountType,
            email,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        // MongoDB duplicate key error code
        if (error.code === 11000) {
            return res.status(400).json({ message: "UserName or Email already exists" });
        }

        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// User Login Route
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_SECRET as string, // Ensure type safety
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// User Update Router - for specific settings on a user's profile
// We use patch to only allow specified fields to be changed
router.patch('/', async (req: Request, res: Response) => {
    try {
        const {nickName, password, email} = req.params;

        const userUpdate = await UserModel.findOneAndUpdate({nickName, password, email}, () => {})
        
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Delete User Router
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userDelete = await UserModel.findByIdAndDelete({_id: id}, () => {})
        
    } catch (error) {
        console.error("Deletion Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})




export default router;
