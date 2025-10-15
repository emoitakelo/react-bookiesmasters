import express from "express";
import { getTodayPredictions } from "../controllers/predictionController.js";

const router = express.Router();

// @desc   Get today's fixtures with predictions (grouped by league)
// @route  GET /api/predictions/today
// @access Public
router.get("/today", getTodayPredictions);

export default router;
