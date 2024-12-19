// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// import UserModel from "../model.js"; // Import the User schema
// import dotenv from "dotenv"; // Import .env
// dotenv.config();

// const router = express.Router();

// // Get specific User Route 
// router.get('/:id', async (req: Request, res: Response) => {  
//   try {  
//     const { _id } = req.params; // Get the user ID from the request parameters  
//     const user = await UserModel.findById(_id); // Fetch the user by ID  

//     // If no user is found, return 404  
//     if (!user) {  
//       return res.status(404).json({ message: "User not found." });  
//     }  

//     const { password: _, ...userData } = user.toObject(); // Remove the password from the response  
//     res.status(200).json(userData); // Return the user's information without the password  
//   } catch (error) {  
//     console.error("Error fetching user:", error);  
//     res.status(500).json({ message: "Internal Server Error" }); // Handle error  
//   }  
// });  

// // Get all Users Route  
// router.get('/page', async (req: Request, res: Response) => {  
//   try {  
//     const users = await UserModel.find(); // Fetch all users from the database  
//     res.status(200).json(users); // Return the list of users  
//   } catch (error) {  
//     console.error("Error fetching all users:", error);  
//     res.status(500).json({ message: "Internal Server Error" }); // Handle error  
//   }  
// }); 

// // User Signup Route
// router.post("/signup", async (req: Request, res: Response) => {
//   try {
//     const { nickName, userName, password, accountType, email, field } = req.body;

//     // Check if the user already exists
//     const existingUser = await UserModel.findOne({ userName });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create a new user
//     const newUser = new UserModel({
//       nickName,
//       userName,
//       password: hashedPassword,
//       accountType,
//       email,
//       field,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error: any) {
//     // MongoDB duplicate key error code
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ message: "UserName or Email already exists" });
//     }

//     console.error("Error during signup:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // User Login Route
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { userName, password } = req.body;
//     console.log("userName:", userName);
//     console.log("password:", password);

//     // Check if the user exists
//     const user = await UserModel.findOne({ userName });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user._id, userName: user.userName },
//       process.env.JWT_SECRET as string, // Ensure type safety
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // User Update Router
// // We use patch to only allow specified fields to be changed by the user
// router.patch("/update/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { nickName, password, email, field } = req.body;
//     console.log(nickName)
//     console.log(password)
//     console.log(email)

//     // Validation for required fields
//     if (!nickName && (!email && !password) && !field) {
//       return res.status(400).json({ message: "Invalid input. Please provide the fields to update." });
//     }

//     // Update whether it's email OR password
//     const updates: Partial<{ nickName: string; email: string; password: string ; field : string}> = {};
//     if (email) updates.email = email;
//     if (password) updates.password = await bcrypt.hash(password, 12); 
//     if (nickName) updates.nickName = nickName;
//     if (field) updates.field = field;

//     const userUpdate = await UserModel.findOneAndUpdate(
//       { _id: id }, // search by user's id from database
//       {$set: updates }, // using $set will help specify whether email or password or nickName is updated
//       { new: true } // returns the updated information
//     );

//     // 404 error handling on userUpdate
//     if (!userUpdate) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     /** 
//      * Return the object without revealing the password
//      * password contains value as '_' as a placeholder
//      * userUpdate.toObject() --> converts the result 
//      * of the userUpdate into JS object
//      * */
//     const { password: _, ...updatedUser } = userUpdate.toObject();
//     res.status(200).json({ message: "User updated successfully.", user: updatedUser });

//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// /**
//  * Delete Router
//  * STRETCH GOAL
//  * */
// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const userDelete = await UserModel.findByIdAndDelete({ _id: id });

//     if(!userDelete) {
//         return res.status(404).json({message: "Unable to delete user."})
//     }

//     const { ...userData } = userDelete.toObject()
//     res.status(200).json({
//         message: "User deleted successfully",
//         user: `${userData}`
//         })
//   } catch (error) {
//     console.error("Deletion Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// export default router;


import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../model.js";
import dotenv from "dotenv";
dotenv.config();
import { controller } from '../controllers/controller'
const router = express.Router();

// // Middleware to verify JWT and set req.userId
// async function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token found.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//     req.userId = decoded.id; // attach userId to req for the next handlers
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error);
//     return res.status(403).json({ message: 'Invalid token.' });
//   }
// }

// Get logged-in user
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

