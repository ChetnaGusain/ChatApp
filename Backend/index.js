import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"
// import authRoutes from "./routes/auth.routes.js"
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

// const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true, // Allow cookies and credentials
}))

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

//routes
// app.use("/api/auth", authRoutes)
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ---------------- Code for deployment -----------------
if(process.env.NODE_ENV === "production"){
  const dirPath = path.resolve()

  app.use(express.static("./Frontend/dist"))
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
