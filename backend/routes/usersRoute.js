import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/", registerUser);
usersRouter.post("/login", loginUser);

export default usersRouter;