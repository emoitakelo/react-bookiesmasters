// controllers/fixtureController.js
import Fixture from "../models/Fixture.js";

export const getFixturesByDate = async (req, res) => {
  console.log("✅ getFixturesByDate called"); // Debug log

  try {
    const { date } = req.params; // e.g. "2025-09-30"
    console.log("📌 Requested date param:", date);

    // Start and end of the day in UTC
    const startOfDay = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    const endOfDay = Math.floor(new Date(`${date}T23:59:59Z`).getTime() / 1000);

    console.log("🕒 Start of day (timestamp):", startOfDay);
    console.log("🕒 End of day (timestamp):", endOfDay);

    const fixtures = await Fixture.find({
      "fixture.timestamp": { $gte: startOfDay, $lte: endOfDay },
    }).sort({ "league.id": 1, "fixture.timestamp": 1 });

    console.log("📊 Fixtures found:", fixtures.length);

    res.json(fixtures);
  } catch (err) {
    console.error("❌ Error in getFixturesByDate:", err.message);
    res.status(500).json({ message: err.message });
  }
};
