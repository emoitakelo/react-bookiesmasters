// server.js (cleaned up)
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import fixtureRoutes from "./routes/fixtures.js";
// import leagueRoutes from "./routes/league.js";
import standingRoutes from "./routes/standings.js";
import fixtureDetails from "./routes/fixturedetail.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Debug log middleware
app.use((req, res, next) => {
  console.log(`➡️ Request URL: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/fixtures", fixtureRoutes);
// app.use("/api/leagues", leagueRoutes);

app.use("/api/standings", standingRoutes);

app.use("/api/fixtures", fixtureDetails);


// Health check
app.get("/ping", (req, res) => {
  res.send("pong");
});

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));
