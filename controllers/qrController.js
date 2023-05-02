import QR from "../models/QRCode.js";
import QRCode from "qrcode";
import User from "../models/User.js";

export const createQRCode = async (req, res) => {
  try {
    const { location, points } = req.body;

    if (!location || !points) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    const newQRCode = await QR.create({
      location: location,
      points: points,
    });

    const qrCodeData = JSON.stringify({ code: newQRCode._id, location });
    const qrImage = await QRCode.toDataURL(qrCodeData);

    return res.status(201).json({
      qrImage: qrImage,
      message: "QR code created successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error creating QR code" });
  }
};

export const getAllQRCodes = async (req, res) => {
  try {
    const qrCodes = await QR.find();

    return res.status(200).json({
      success: true,
      qrCodes: qrCodes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error fetching QR codes" });
  }
};

export const scanQRCode = async (req, res) => {
  try {
    const { userId, qrCodeData } = req.body;

    const data = JSON.parse(qrCodeData);
    const { code, location } = data;

    const qrCode = await QRModel.findById(code);

    if (!qrCode) {
      return res
        .status(404)
        .json({ success: false, error: "QR code not found" });
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { $inc: { points: qrCode.points } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      points: user.points,
      message: "QR code scanned successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error scanning QR code" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.status(200).json({ success: true, leaderboard: users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching leaderboard" });
  }
};
