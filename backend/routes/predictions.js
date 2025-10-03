import express from "express";
import Prediction from "../models/Prediction.js";

const router = express.Router();

// ✅ Get prediction by fixtureId
router.get("/:fixtureId", async (req, res) => {
  try {
    const { fixtureId } = req.params;
    const prediction = await Prediction.findOne({ fixtureId: Number(fixtureId) });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.json(prediction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
