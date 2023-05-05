import express from "express";
import  jwt  from "jsonwebtoken";
import bycript from "bcrypt";

const router = express.Router();

import { UserModel } from "../models/User.js";

router.post("/register", async (req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(user) {
      return res.status(400).json({
        messsage: "Username already exists"
      })
    }
    const hashedpassword = await bycript.hash(password,10);
    const newUser = new UserModel({username, password: hashedpassword})
    await newUser.save();
    res.json({ message: "User registed successfully"});
})


router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username});

    if(!user) {
        return res.status(400).json({message: "Username or password is incorrect"});
    }
 
    const isPasswordValid = await bycript.compare(password, user.password)
    if(!isPasswordValid) {
        return res.status(400).json({message: "Username or password is incorrect"})
    }
    const token = jwt.sign({id: user._id }, "secret");
    res.json({ token, userID: user._id, username});
})

export {router as userRouter};

