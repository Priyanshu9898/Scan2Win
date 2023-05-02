import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  const db = process.env.MONGO_URL;
  try {
    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log(`Mongoose Connected successfully ${connection.host}`);
  } catch (err) {
    return res.status().json({
      message: err.message,
      message: "Couldn't connect to MongoDB Database",
    });
  }
};