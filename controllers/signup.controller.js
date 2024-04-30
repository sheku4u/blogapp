import mongoose from "mongoose";
import usersModel from "../models/users.model.js";
import {encrypt} from "../utils/bcrypt.js";

const signupController = async (req, res) => {

    const { username, password } = req.body;
    const hashpassword = await encrypt(password);
    const user = await usersModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new usersModel({ username, password: hashpassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
}

export default signupController