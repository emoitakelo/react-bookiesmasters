import express from "express";
import { getFixturesByDate ,getAllFixtures } from "../controllers/fixtureController.js";

const router = express.Router();

// /api/fixtures/date/2025-09-30
router.get("/date/:date", getFixturesByDate);
router.get("/all", getAllFixtures);

export default router;
