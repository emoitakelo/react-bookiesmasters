const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const fixtureRoutes = require("./routes/fixtures");
const tipRoutes = require('./routes/tipRoutes');
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


app.use("/api/fixtures", fixtureRoutes);
app.use('/api/tips', tipRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/predictions", require("./routes/predictions"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
