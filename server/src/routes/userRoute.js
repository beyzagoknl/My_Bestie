import express from "express";
import {
  createUser,
  login,
  validateToken,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.post("/validate", validateToken);

export default userRouter;
