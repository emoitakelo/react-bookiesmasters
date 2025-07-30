const Prediction = require("../models/Prediction");

// @desc Get all predictions (sorted by embedded fixture date)
exports.getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({}).sort({ "fixture.date": 1 });
    res.json(predictions);
  } catch (err) {
    console.error("Error fetching predictions:", err);
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
};

// @desc Get single prediction by fixtureId
exports.getPredictionByFixtureId = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      fixtureId: parseInt(req.params.fixtureId),
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.json(prediction);
  } catch (err) {
    console.error("Error fetching prediction:", err);
    res.status(500).json({ error: "Error fetching prediction" });
  }
};

// ✅ FIXED: @desc Get predictions by fixture.date (date range)
// @route GET /api/predictions/by-date/:date
exports.getPredictionsByDate = async (req, res) => {
  const { date } = req.params; // expected format: "YYYY-MM-DD"

  try {
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const predictions = await Prediction.find({
      "fixture.date": {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ "fixture.date": 1 });

    if (!predictions.length) {
      return res.status(404).json({ message: "No predictions found for this date" });
    }

    res.json(predictions);
  } catch (err) {
    console.error("Error fetching predictions by date:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete predictions by date (optional)
// @route DELETE /api/predictions/by-date/:date
exports.deletePredictionsByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const result = await Prediction.deleteMany({ matchDate: date });
    res.json({ message: `Deleted ${result.deletedCount} predictions for ${date}` });
  } catch (err) {
    res.status(500).json({ error: "Error deleting predictions" });
  }
};
