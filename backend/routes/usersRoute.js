import express from "express";
import { getAllUsers, loginUser, registerUser , editUser} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.put("/edit/:userId", editUser);

export default usersRouter;