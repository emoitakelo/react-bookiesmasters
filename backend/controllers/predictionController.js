// controllers/predictionController.js
import { getPredictionsByDateService } from "../services/predictionService.js";

/**
 * @desc    Get fixtures + predictions merged by date
 * @route   GET /api/predictions?date=YYYY-MM-DD
 * @access  Public
 */
export const getPredictionsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date query required (YYYY-MM-DD)" });
    }

    console.log("🔍 Fetching predictions for:", date);

    const merged = await getPredictionsByDateService(date);

    if (!merged || merged.length === 0) {
      return res.status(404).json({ success: false, message: "No fixtures found for this date" });
    }

    return res.status(200).json({
      success: true,
      count: merged.length,
      data: merged,
    });
  } catch (err) {
    console.error("❌ Error in getPredictionsByDate controller:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch predictions by date",
    });
  }
};
