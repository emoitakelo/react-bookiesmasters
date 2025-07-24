const Fixture = require('../models/Fixture');

// GET /api/fixtures/random — 20 random fixtures
exports.getRandomFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.aggregate([{ $sample: { size: 20 } }]);
    res.json(fixtures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/fixtures — filtered by date, team, league (optional)
exports.getFilteredFixtures = async (req, res) => {
  try {
    const { date, team, league } = req.query;
    let query = {};

    if (date) {
      // Match the date portion of the ISO string (yyyy-mm-dd)
      const isoStart = new Date(date);
      const isoEnd = new Date(date);
      isoEnd.setHours(23, 59, 59, 999);

      query["fixture.date"] = {
        $gte: isoStart.toISOString(),
        $lte: isoEnd.toISOString()
      };
    }

    if (team) {
      query.$or = [
        { "teams.home.name": { $regex: team, $options: "i" } },
        { "teams.away.name": { $regex: team, $options: "i" } }
      ];
    }

    if (league) {
      query["league.name"] = { $regex: league, $options: "i" };
    }

    const fixtures = await Fixture.find(query).limit(50);
    res.json(fixtures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/fixtures/:id — single fixture details
exports.getFixtureById = async (req, res) => {
  try {
    const fixture = await Fixture.findOne({ 'fixture.id': parseInt(req.params.id) });
    if (!fixture) return res.status(404).json({ message: 'Fixture not found' });
    res.json(fixture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching fixture' });
  }
};
