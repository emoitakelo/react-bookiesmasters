const express = require("express");
const router = express.Router();
const {
  getAllPredictions,
  getPredictionByFixtureId,
  getPredictionsByDate,
  deletePredictionsByDate
} = require("../controllers/predictionController");

// GET /api/predictions - all predictions
router.get("/", getAllPredictions);

// ✅ NEW: GET predictions for a specific date (e.g. today, tomorrow)
router.get("/by-date/:date", getPredictionsByDate);


// GET /api/predictions/:fixtureId - single prediction
router.get("/:fixtureId", getPredictionByFixtureId);


// ✅ NEW: DELETE predictions for a specific date (for cleanup)
router.delete("/by-date/:date", deletePredictionsByDate);

module.exports = router;
