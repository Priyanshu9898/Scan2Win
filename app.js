import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { connectDB } from "./config/Database.js";
import userRoutes from "./routers/userRouter.js";
import qrRoutes from "./routers/qrRouter.js";

//config configuration
dotenv.config({ path: "./config/config.env" });

// Database Connection
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));

// Use routes
app.use('/api/auth', userRoutes);
app.use('/api/v1', qrRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
