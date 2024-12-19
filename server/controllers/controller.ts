import { Request, Response, NextFunction } from 'express';  
import jwt from 'jsonwebtoken';  

export const controller = {  
    verifyToken: async (req: Request, res: Response, next: NextFunction) => {  
        const authHeader = req.headers['authorization'];  
        if (!authHeader) return res.status(401).json({ message: 'No token provided.' });  

        const token = authHeader.split(' ')[1];  
        if (!token) return res.status(401).json({ message: 'No token found.' });  

        try {  
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };  
            (req as any).userId = decoded.id; // attach userId to req for the next handlers  
            next();  
        } catch (error) {  
            console.error("JWT verification error:", error);  
            return res.status(403).json({ message: 'Invalid token.' });  
        }  
    }  
};
