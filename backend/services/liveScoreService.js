// services/liveScoreService.js
import axios from "axios";
import LiveScore from "../models/LiveScore.js";
import Prediction from "../models/Prediction.js";

export const fetchAndUpdateLiveScores = async () => {
  try {
    console.log("♻️ Refreshing live scores...");

    // 1️⃣ Clear out old live data (so only current live games remain)
    await LiveScore.deleteMany({});
    console.log("🗑️ Cleared old live score documents");

    // 2️⃣ Fetch all live fixtures from API-Football
    const { data } = await axios.get("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: { "x-apisports-key": process.env.API_KEY },
    });

    if (!data.response || data.response.length === 0) {
      console.log("⚠️ No live fixtures returned from API");
      return;
    }

    // 3️⃣ Get all fixture IDs already in predictions (we’ll only keep these)
    const existingIds = await Prediction.distinct("fixtureId");
    if (!existingIds.length) {
      console.log("⚠️ No fixture IDs found in predictions collection");
      return;
    }

    // 4️⃣ Keep only live fixtures whose fixtureId is in our predictions
    const filteredLives = data.response.filter(fix =>
      existingIds.includes(fix.fixture.id)
    );

    if (filteredLives.length === 0) {
      console.log("⚠️ No live fixtures matched with existing predictions");
      return;
    }

    // 5️⃣ Prepare and upsert filtered live matches
    const lives = filteredLives.map(fix => ({
  fixtureId: fix.fixture.id,
  league: fix.league.name,
  status: fix.fixture.status,
  homeTeam: {
    id: fix.teams.home.id,
    name: fix.teams.home.name,
    logo: fix.teams.home.logo,
    score: fix.goals?.home ?? 0,   // ← map goals.home to score
  },
  awayTeam: {
    id: fix.teams.away.id,
    name: fix.teams.away.name,
    logo: fix.teams.away.logo,
    score: fix.goals?.away ?? 0,   // ← map goals.away to score
  },
  createdAt: new Date(),
}));


    // Use bulkWrite for faster performance than looping
    const operations = lives.map(live => ({
      updateOne: {
        filter: { fixtureId: live.fixtureId },
        update: { $set: live },
        upsert: true,
      },
    }));

    await LiveScore.bulkWrite(operations);

    console.log(`✅ Updated ${lives.length} live fixtures (matched with predictions)`);

  } catch (error) {
    console.error("❌ Live score update failed:", error.message);
  }
};
