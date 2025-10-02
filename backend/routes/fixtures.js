import express from "express";
import { getFixturesByDate } from "../controllers/fixtureController.js";

const router = express.Router();

// /api/fixtures/date/2025-09-30
router.get("/date/:date", getFixturesByDate);

export default router;
