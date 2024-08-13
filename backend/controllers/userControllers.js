const User = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Login = async (req, res, next) => {
    try{
        const { emailOrMobile, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
        });

        if(!user){
            return res.status(404).json({message: "User not found" });
        }
        
        if(!(await bcryptjs.compare(password, user.password))){
            return res.status(400).json({message: "Invalid password"});
        }

        var token = await jwt.sign(
            {id: user._id, username: user.username, email: user.email, mobile: user.mobile},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: false,
            domain: 'localhost',
            path: '/'
        };

        res.status(200).cookie("token", token, options).json({
            id: user._id,
            username: user.username,
            email: user.email,
            mobile: user.mobile
        });
    }
    catch(err){
        next(err);
    }
};

const Register = async (req, res, next) => {
    try{
        const { username, email, mobile, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { mobile }],
        });

        if(existingUser){
            return res.status(400).json({message: "User already exists with the given email or mobile number" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            mobile: mobile
        });

        if (!user) {
            return res.status(400).json({ message: "Failed to create user" });
        }

        var token = await jwt.sign(
            {id: user._id, username: user.username, email: user.email, mobile: user.mobile},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: false,
            domain: 'localhost',
            path: '/'
        };

        res.status(201).cookie("token", token, options).json({
            id: user._id,
            username: user.username,
            email: user.email,
            mobile: user.mobile
        });
    }
    catch(err){
        next(err);
    }
};

const ChangePassword = async (req, res, next) => {
    try{
        const { id, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const result = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { password: hashedPassword }, { new: true });
        if(result){
            res.status(200).json({message: "Password changed Successfully!"});
        }
        else{
            res.status(500).json({message: "Something went wrong!"})
        }
        
    }
    catch(err){
        next(err);
    }
        
};




module.exports =  { Login, Register, ChangePassword };