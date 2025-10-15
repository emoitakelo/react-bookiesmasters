import { getTodayPredictionsService } from "../services/predictionService.js";

/**
 * @desc   Get today's fixtures with predictions (grouped by league)
 * @route  GET /api/predictions/today
 * @access Public
 */
export const getTodayPredictions = async (req, res) => {
  try {
    // 1️⃣ Call the service to fetch + merge + group today's data
    const groupedPredictions = await getTodayPredictionsService();

    // 2️⃣ If no data found, return a user-friendly message
    if (!groupedPredictions || groupedPredictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No predictions available for today.",
      });
    }

    // 3️⃣ Success → send data to frontend
    res.status(200).json({
      success: true,
      count: groupedPredictions.length,
      data: groupedPredictions,
    });
  } catch (error) {
    console.error("❌ Error in getTodayPredictions controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error fetching today's predictions",
    });
  }
};
