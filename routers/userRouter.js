import express from "express";
import { getAllUsers, loginController, registerController, logoutController } from "../controllers/userController.js";

const router = express.Router();


// Login route
router.route("/login").post(loginController);

// Register route
router.route("/register").post(registerController);

// Logout route
router.route("/logout").get(logoutController);

// Get All Users route
router.route("/allUsers").get(getAllUsers);

// Get User detail route
router.route("/user/:id").get(getAllUsers);

export default router;