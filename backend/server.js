import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import predictionRoutes from "./routes/predictionRoutes.js";
import healthRoute from "./routes/health.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/predictions", predictionRoutes);
app.use("/api", healthRoute);

// Default route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
