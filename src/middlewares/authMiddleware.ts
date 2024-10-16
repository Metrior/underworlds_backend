import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
    role: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    try {
        req.body.user = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== 'superAdmin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};
