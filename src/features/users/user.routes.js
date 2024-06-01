import express from "express";
// import passport from "passport";

import userController from "./user.controller.js";

export const userRouter = express.Router();

const UserController = new userController();

userRouter.get("/register", (req, res) => {
  UserController.getRegisterPage(req, res);
});

userRouter.post("/register", (req, res) => {
  UserController.registerUser(req, res);
});

userRouter.get("/login", (req, res) => {
  UserController.loginPage(req, res);
});

userRouter.post("/login", (req, res) => {
  UserController.loginUser(req, res);
});

userRouter.get("/forgot-password", (req, res) => {
  UserController.forgotPasswordPage(req, res);
});

userRouter.post("/reset-password", (req, res) => {
  UserController.resetPassword(req, res);
});

userRouter.get("/logout", (req, res) => {
  UserController.logout(req, res);
});
