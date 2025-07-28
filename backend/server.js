const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const fixtureRoutes = require("./routes/fixtures");
const tipRoutes = require('./routes/tipRoutes');
const authRoutes = require("./routes/auth");
const predictionRoutes = require("./routes/predictions");

const app = express();

// ✅ Configure allowed origins
const allowedOrigins = [
  "https://www.bookiesmasters.com",  // Live frontend
  "https://bookiesmasters.com",      // Non-www version
  "http://localhost:3000"            // Dev environment
];

// ✅ Apply CORS middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Register API routes
app.use("/api/fixtures", fixtureRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
