import Fixture from "../models/Fixture.js";
import Standing from "../models/Standing.js";

// GET /api/fixtures/:id
export const getFixtureDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get fixture
    const fixture = await Fixture.findOne({ "fixture.id": parseInt(id) });
    if (!fixture) {
      return res.status(404).json({ message: "Fixture not found" });
    }

    const homeTeamId = fixture.teams.home.id;
    const awayTeamId = fixture.teams.away.id;
    const leagueId = fixture.league.id;

    // 2. Get H2H (last 5 head-to-head matches)
    const h2h = await Fixture.find({
      $or: [
        { "teams.home.id": homeTeamId, "teams.away.id": awayTeamId },
        { "teams.home.id": awayTeamId, "teams.away.id": homeTeamId }
      ],
      "fixture.status.short": "FT"
    })
      .sort({ "fixture.date": -1 })
      .limit(5);

    // 3. Last 5 matches for each team
    const last5Home = await Fixture.find({
      $or: [{ "teams.home.id": homeTeamId }, { "teams.away.id": homeTeamId }],
      "fixture.status.short": "FT"
    })
      .sort({ "fixture.date": -1 })
      .limit(5);

    const last5Away = await Fixture.find({
      $or: [{ "teams.home.id": awayTeamId }, { "teams.away.id": awayTeamId }],
      "fixture.status.short": "FT"
    })
      .sort({ "fixture.date": -1 })
      .limit(5);

    // 4. Standings (fetch from separate collection)
    const standings = await Standing.findOne({ leagueId });

    res.json({
      fixture,
      h2h,
      last5: {
        home: last5Home,
        away: last5Away,
      },
      standings: standings ? standings.table : []
    });
  } catch (err) {
    console.error("Error fetching fixture details:", err);
    res.status(500).json({ message: "Server error" });
  }
};
