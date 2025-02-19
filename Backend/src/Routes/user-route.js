import express from "express";
import { Login, Signup } from "../controllers/user-controller.js";
import { validateLogin, validateSignup } from "../middlewares/validator.js";

const Router = express.Router();

Router.post("/sign-up", validateSignup, Signup);
Router.post("/login", validateLogin, Login);

export default Router;
