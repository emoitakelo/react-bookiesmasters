import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { fetchAndUpdateLiveScores } from "./services/liveScoreService.js";
import { fetchAndUpdateTodayFinishedFixtures } from "./updateTodayFixture.js"; // new service

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
app.get("/", (req, res) => res.send("API is running..."));

// 🔁 Single 30-second interval to update fixtures + live scores + finished fixtures
const updateAllData = async () => {
  try {
    await Promise.all([
      fetchAndUpdateLiveScores(),
      fetchAndUpdateTodayFinishedFixtures() // ✅ added finished fixtures
    ]);
    console.log("🔁 Fixtures, live scores, and finished fixtures updated successfully");
  } catch (err) {
    console.error("❌ Error updating data:", err);
  }
};

// Run immediately at startup
updateAllData();

// Then every 30 seconds
setInterval(updateAllData, 30 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
