import { addBookmarks, getBookmarks } from "./addBookmarks.contoller.js";
import addPosts from "./addPosts.controller.js";
import editPost from "./editPost.controller.js";
import getAllPosts from "./getAllPosts.controller.js";
import userPost from "./getUserPosts.controller.js";
import { loginController, userId } from "./login.controller.js";
import profileController from "./profile.controller.js";
import sendFilterData from "./sendFilterData.controller.js";
import signupController from "./signup.controller.js";

export {
  addBookmarks,
  getAllPosts,
  getBookmarks,
  addPosts,
  editPost,
  userPost,
  loginController,
  profileController,
  sendFilterData,
  signupController,
  userId,
};
