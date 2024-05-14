import usersModel from "../models/usersModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "Please fill all required fields."});
        } else {
            const isAlreadyRegistered = await usersModel.findOne({email});
            if (isAlreadyRegistered) {
                return res.status(400).json({message: "User with this email already exists."});
            } else {
                const newUser = new usersModel({
                    fullName,
                    email,
                });
                bcryptjs.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    newUser.set('password', hash);
                    newUser.save();
                    next();
                });
                return res.status(200).json({message: "User registered successfully."});
            }
        }
    } catch (err) {
        res.status(500).json(err);
    } 
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all required fields."});
        } else {
            const user = await usersModel.findOne({ email });
            if (!user) {
                return res.status(400).send("Email or password is incorrect.");
            } else {
                const validateUser = await bcryptjs.compare(password, user.password);
                if (!validateUser) {
                    res.status(400).send("Email or password is incorrect.");
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email,
                    };
                    const JWT_SECRET = 'secret';

                    jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        user.set('token', token);
                        user.save();
                        return res.status(200).json({ user: {id: user._id, email: user.email, fullName: user.fullName}, token: user.token});
                    });

                }
            }
        }
    } catch (error) {
        console.log(error);   
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.find();
        const usersData = Promise.all(users.map(async (user) => {
            return { user: {email: user.email, fullName: user.fullName}, userId: user._id };
        }));
        res.status(200).json(await usersData);
    } catch (err) {
        res.status(500).json(err);
    }
}