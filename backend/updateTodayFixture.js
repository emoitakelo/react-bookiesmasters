// services/updateTodayFinishedFixtures.js
import axios from "axios";
import Fixture from "./models/Fixture.js"; // make sure the path is correct

export const fetchAndUpdateTodayFinishedFixtures = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    console.log(`🔍 Fetching all today's finished fixtures...`);

    // Fetch all fixtures for today that are finished
    const { data } = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: { "x-apisports-key": process.env.API_KEY },
      params: { date: today, status: "FT" },
    });

    const fixtures = data.response;
    if (!fixtures?.length) return console.log("⚠️ No finished fixtures today.");

    // Get existing fixture IDs and status from DB
    const existingFixtures = await Fixture.find(
      { "fixture.id": { $in: fixtures.map(f => f.fixture.id) } },
      { "fixture.id": 1, "fixture.status.short": 1 }
    );

    const existingStatusMap = new Map(existingFixtures.map(f => [f.fixture.id, f.fixture.status.short]));

    // Filter fixtures that exist in DB and just became finished
    const fixturesToUpdate = fixtures.filter(
      f => existingStatusMap.has(f.fixture.id) && existingStatusMap.get(f.fixture.id) !== "FT"
    );

    if (!fixturesToUpdate.length) return console.log("⚠️ No newly finished fixtures to update.");

    // Update DB
    for (const f of fixturesToUpdate) {
      await Fixture.updateOne({ "fixture.id": f.fixture.id }, { $set: f }, { upsert: true });
      console.log(`✅ Updated finished fixture: ${f.teams.home.name} vs ${f.teams.away.name}`);
    }

    console.log(`🎯 Updated ${fixturesToUpdate.length} newly finished fixtures.`);
  } catch (err) {
    console.error("❌ Error updating today's finished fixtures:", err.message);
  }
};
