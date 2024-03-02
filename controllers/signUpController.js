import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signup = async(req,res)=>{

    try {
        const { username, email, password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({
            status: 'error',
            message: 'Password is required',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user data
        const saveData = await userData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: saveData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
}