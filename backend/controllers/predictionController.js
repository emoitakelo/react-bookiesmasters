// controllers/predictionController.js
import { getPredictionsByDateService } from "../services/predictionService.js";
import LiveScore from "../models/LiveScore.js";
import { mergeLiveScores } from "../helpers/mergeLiveScores.js";

export const getPredictionsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Date query required (YYYY-MM-DD)" });
    }

    console.log("🔍 Fetching predictions for:", date);

    // 1️⃣ Get fixtures + predictions (your original logic)
    const merged = await getPredictionsByDateService(date);
    if (!merged || merged.length === 0) {
      return res.status(404).json({ success: false, message: "No fixtures found for this date" });
    }

    // 2️⃣ Fetch live scores stored in MongoDB
    const liveScores = await LiveScore.find({});
    if (liveScores.length > 0) {
      console.log(`⚡ Merging ${liveScores.length} live fixtures`);
    }

    // 3️⃣ Merge live data into predictions
    const mergedWithLive = mergeLiveScores(merged, liveScores);

    // 4️⃣ Send updated result to frontend
    return res.status(200).json({
      success: true,
      count: mergedWithLive.length,
      data: mergedWithLive,
    });
  } catch (err) {
    console.error("❌ Error in getPredictionsByDate controller:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch predictions by date",
    });
  }
};
