// controllers/predictionController.js
import { getPredictionsByDateService } from "../services/predictionService.js";
import LiveScore from "../models/LiveScore.js";
import { mergeLiveScores } from "../helpers/mergeLiveScores.js";

export const getPredictionsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date query required (YYYY-MM-DD)",
      });
    }

    console.log("🔍 Fetching predictions for:", date);

    // 1️⃣ Get fixtures + predictions
    const merged = await getPredictionsByDateService(date);
    console.log(`📊 Predictions fetched: ${merged?.length || 0}`);

    if (!merged || merged.length === 0) {
      console.warn("⚠️ No fixtures found for this date");
      return res.status(404).json({
        success: false,
        message: "No fixtures found for this date",
      });
    }

    // 2️⃣ Fetch live scores from MongoDB
    const liveScores = await LiveScore.find({});
    console.log(`⚡ Found ${liveScores.length} live score entries`);

    // 3️⃣ Merge live data
    const mergedWithLive = mergeLiveScores(merged, liveScores);
    console.log("✅ Successfully merged predictions with live scores");

    // 4️⃣ Send to frontend
    return res.status(200).json({
      success: true,
      count: mergedWithLive.length,
      data: mergedWithLive,
    });
  } catch (err) {
    console.error("❌ Error in getPredictionsByDate controller:");
    console.error(err.message);
    console.error(err.stack);

    // include actual error in response temporarily (for testing)
    return res.status(500).json({
      success: false,
      message: "Failed to fetch predictions by date",
      error: err.message,
    });
  }
};

