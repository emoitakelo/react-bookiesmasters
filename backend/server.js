// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { fetchAndUpdateLiveScores } from "./services/liveScoreService.js";

import predictionRoutes from "./routes/predictionRoutes.js";
import healthRoute from "./routes/health.js";
import liveScoreRoutes from "./routes/liveScoreRoutes.js"; 
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/predictions", predictionRoutes);
app.use("/api", healthRoute);
app.use("/api/livescores", liveScoreRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔁 Start 15-second polling loop
setInterval(fetchAndUpdateLiveScores, 30000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
