import express from "express";
import { createQRCode, getAllQRCodes, getLeaderboard, scanQRCode } from "../controllers/qrController.js";

const router = express.Router();


// Create QR code route
router.route("/createQR").post(createQRCode);

// Get all QR codes route
router.route("/QR").get(getAllQRCodes);

// Scan QR code route
router.route("/scan").post(scanQRCode);

// Get leaderBoard routes
router.route("/leaderboard").get(getLeaderboard);


export default router;