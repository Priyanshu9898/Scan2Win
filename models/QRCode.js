import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Code is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  points: {
    type: Number,
    required: [true, "Points are required"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QR = mongoose.model("QR", qrSchema);

export default QR;
