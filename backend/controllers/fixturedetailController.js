import Fixture from "../models/Fixture.js"; // your fixture model

export const getFixtureDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const fixture = await Fixture.findOne({ "fixture.id": id });

    if (!fixture) return res.status(404).json({ message: "Fixture not found" });

    // structure response
    const details = {
      fixture: fixture.fixture,
      league: fixture.league,
      teams: fixture.teams,
      score: fixture.score,
      venue: fixture.fixture.venue,
      prediction: fixture.prediction || null,
      h2h: fixture.h2h || [],
      form: fixture.form || {},
    };

    res.json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
