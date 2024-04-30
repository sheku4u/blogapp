import mongoose from "mongoose";
import usersModel from "../models/users.model.js";
import { decrypt } from "../utils/bcrypt.js";
// import jwt from 'jsonwebtoken'
let userId = ""
const loginController = async (req, res) => {
    const { username, password } = req.body;
    // const secret = process.env.JWT_SECRET_CODE

    const user=await usersModel.findOne({username});
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // res.json({ message: "Login successful" });
    else{
        const decryptPassword=await decrypt(password,user.password);
       if(decryptPassword===true){
        // jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
        //     if (err)  throw err
        //       // res.json(token);
        //     res.cookie("token", token).json({
        //       id: user._id,
        //       username,
        //     });
        //     console.log(token)
        //   });
          
         
        return res.status(200).json({ username: username });
         userId =  res.json({ username: username });


       }
       else{
        return res.status(400).json({ message: "Invalid credentials" });
       }
    }
}

  ;
export {loginController,userId}