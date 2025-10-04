import Fixture from "../models/Fixture.js";
import Prediction from "../models/Prediction.js";

export const getFixtureDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const fixtureId = Number(id);

    // 1. Get the fixture
    const fixture = await Fixture.findOne({
      "fixture.id": { $in: [id, fixtureId] },
    });
    if (!fixture) return res.status(404).json({ message: "Fixture not found" });

    // 2. Get the prediction
    const prediction = await Prediction.findOne({ fixtureId: fixtureId });

    // 3. Get last 5 matches for home/away (only past matches)
    const today = new Date().toISOString();
    const homeTeamId = fixture.teams?.home?.id;
    const awayTeamId = fixture.teams?.away?.id;

    let recentHome = [];
    let recentAway = [];

    if (homeTeamId) {
      recentHome = await Fixture.find({
        $or: [{ "teams.home.id": homeTeamId }, { "teams.away.id": homeTeamId }],
        "fixture.id": { $ne: fixtureId },
        "fixture.date": { $lt: today },
      })
        .sort({ "fixture.date": -1 })
        .limit(5);
    }

    if (awayTeamId) {
      recentAway = await Fixture.find({
        $or: [{ "teams.home.id": awayTeamId }, { "teams.away.id": awayTeamId }],
        "fixture.id": { $ne: fixtureId },
        "fixture.date": { $lt: today },
      })
        .sort({ "fixture.date": -1 })
        .limit(5);
    }

    // 4. Build response for frontend
    const details = {
      fixture: fixture.fixture,
      league: fixture.league,
      teams: fixture.teams,
      score: fixture.score,
      venue: fixture.fixture.venue,
      // prediction data
      prediction: prediction?.predictions || null,
      comparison: prediction?.comparison || null,
      h2h: prediction?.h2h || [],
      // recent matches
      recent: {
        home: recentHome,
        away: recentAway,
      },
    };

    res.json(details);
  } catch (err) {
    console.error("❌ Error in getFixtureDetails:", err);
    res.status(500).json({ message: "Server error" });
  }
};
