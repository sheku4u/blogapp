import express from "express";
import mongoose from "mongoose";
import multer from 'multer'
import cors from "cors";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
// import signupController from './controllers/signup.controller.js';
// import loginController from './controllers/login.controller.js';
import passport from "passport";
import "./passport.js";
import session from "express-session";
// import addPosts from './controllers/addPosts.controller.js';
// import getAllPosts from './controllers/getAllPosts.controller.js';
// import userPost from './controllers/getUserPosts.controller.js';
// import editPost from './controllers/editPost.controller.js';
// import {addBookmarks,getBookmarks} from './controllers/addBookmarks.contoller.js';
// import sendFilterData from './controllers/sendFilterData.controller.js';

import {
  signupController,
  loginController,
  addPosts,
  getAllPosts,
  userPost,
  editPost,
  addBookmarks,
  getBookmarks,
  profileController,
  sendFilterData,
} from "./controllers/index.js";
// import jwt from 'jsonwebtoken'

connectDB();
const app = express();
// const secret = process.env.JWT_SECRET_CODE  
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: (req, imageUrl, cb) =>{
    cb(null, 'public/Images')
  },
  filename:(req, file, cb)=>{
    cb(null, file+"_"+ Date.now())
  }
});
const upload = multer({ storage: storage });
const PORT = 8000;

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
  const data = req.query.data;
  console.log(data);
  if (data) {
    res.send(data);
  } else {
    res.send("no data");
  }
});

app.post("/signup", signupController);

app.post("/login", loginController);

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout done successfully");
});

app.get("/profile", (req,res)=>{
//  const {token} = req.cookies
  
//   jwt.verify(token,secret ,{},(err,info)=>{
//     if (err) throw err
//     res.json(info)
//   })
// res.json(token)



  
});

//google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home
    // console.log(req.user)
    res.redirect(`http://localhost:8000?data=${JSON.stringify(req.user)}`);
  }
);

//posts

app.post("/addPosts", upload.single('imageUrl'),addPosts);
app.get("/getAllPosts", getAllPosts);
app.get("/userPost/:userId", userPost);
app.post("/editPost", editPost);

//bookmarks
app.post("/addBookmarks", addBookmarks);
app.get("/getBookmarks/:userId", getBookmarks);

//filter
app.post("/sendFilterData/:catagory", sendFilterData);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
