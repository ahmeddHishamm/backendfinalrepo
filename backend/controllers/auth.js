// Import required modules
const axios = require("axios");
const User = require("../models/User");
const bcrypt = require ("bcrypt");
const jwt =require("jsonwebtoken")
const {createError} = require("../utils/error");
const register = async (req, res,) => {
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password: hash
        })

        await newUser.save()
       return  res.status(200).send("User has been created")
    }catch (err){
        return res.status(500).json({ message: err.message })
    }

}

const login = async (req, res, next ) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"user not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400,"incorrect Password"));

        const token= jwt.sign({id:user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET ) //put in .env

        const{password, isAdmin, ...otherDetails}= user._doc;

        return res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({...otherDetails});
    }catch (err){
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    register,
    login
};