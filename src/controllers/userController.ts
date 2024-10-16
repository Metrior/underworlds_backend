import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createAdmin = async (req: Request, res: Response) => {
    const { email, password, userName, role } = req.body;
    if (req.body.user.role !== 'superAdmin') {
        return res.status(403).json({ error: 'Only superAdmins can create admins or superAdmins' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new UserModel({ email, password: hashedPassword, userName, role });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create admin' });
    }
};
