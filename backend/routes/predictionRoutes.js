import express from "express";
import { getPredictionsByDate } from "../controllers/predictionController.js";

const router = express.Router();

// @desc   Get today's fixtures with predictions (grouped by league)
// @route  GET /api/predictions/today
// @access Public
router.get("/", getPredictionsByDate);

export default router;
