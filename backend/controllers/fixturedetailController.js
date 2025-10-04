import Fixture from "../models/Fixture.js"; // your fixture model

export const getFixtureDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const fixtureId = Number(id); // ensure numeric

    // allow both string and number matching just in case DB is mixed
    const fixture = await Fixture.findOne({
      "fixture.id": { $in: [id, fixtureId] },
    });

    if (!fixture) return res.status(404).json({ message: "Fixture not found" });

    // fetch last 5 matches for each team, excluding the current fixture
    const homeTeamId = fixture.teams?.home?.id;
    const awayTeamId = fixture.teams?.away?.id;

    let recentHome = [];
    let recentAway = [];

    // today's date (ISO) to filter past matches
    const today = new Date().toISOString();

    if (homeTeamId) {
      recentHome = await Fixture.find({
        $or: [{ "teams.home.id": homeTeamId }, { "teams.away.id": homeTeamId }],
        "fixture.id": { $ne: fixtureId },
        "fixture.date": { $lt: today }, // ✅ only past matches
      })
        .sort({ "fixture.date": -1 }) // most recent first
        .limit(5);
    }

    if (awayTeamId) {
      recentAway = await Fixture.find({
        $or: [{ "teams.home.id": awayTeamId }, { "teams.away.id": awayTeamId }],
        "fixture.id": { $ne: fixtureId },
        "fixture.date": { $lt: today }, // ✅ only past matches
      })
        .sort({ "fixture.date": -1 })
        .limit(5);
    }

    // structure response
    const details = {
      fixture: fixture.fixture,
      league: fixture.league,
      teams: fixture.teams,
      score: fixture.score,
      venue: fixture.fixture.venue,
      prediction: fixture.prediction || null,
      h2h: fixture.h2h || [],
      recent: {
        home: recentHome,
        away: recentAway,
      },
    };

    res.json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
