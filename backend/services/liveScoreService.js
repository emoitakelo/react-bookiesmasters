import axios from "axios";
import LiveScore from "../models/LiveScore.js";
import Prediction from "../models/Prediction.js";

export const fetchAndUpdateLiveScores = async () => {
  try {
    console.log("♻️ Refreshing full live scores...");

    // 1️⃣ Remove old live data
    await LiveScore.deleteMany({});
    console.log("🗑️ Cleared old live score documents");

    // 2️⃣ Fetch ALL live fixtures from API-Football
    const { data } = await axios.get("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: { "x-apisports-key": process.env.API_KEY },
    });

    if (!data.response || data.response.length === 0) {
      console.log("⚠️ No live fixtures returned from API");
      return;
    }

    // 3️⃣ Get all fixture IDs already present in predictions
    const existingIds = await Prediction.distinct("fixtureId");
    if (!existingIds.length) {
      console.log("⚠️ No fixture IDs found in predictions collection");
      return;
    }

    // 4️⃣ Keep only live fixtures that match your predictions
    const filteredLives = data.response.filter(fix =>
      existingIds.includes(fix.fixture.id)
    );

    if (filteredLives.length === 0) {
      console.log("⚠️ No live fixtures matched with existing predictions");
      return;
    }

    // 5️⃣ Prepare the full fixture objects — save everything from API
    const lives = filteredLives.map(fix => ({
      fixtureId: fix.fixture.id,
      fullData: fix, // 🧩 store entire fixture response as-is
      updatedAt: new Date(),
    }));

    // 6️⃣ Bulk upsert for performance
    const operations = lives.map(live => ({
      updateOne: {
        filter: { fixtureId: live.fixtureId },
        update: { $set: live },
        upsert: true,
      },
    }));

    await LiveScore.bulkWrite(operations);

    console.log(`✅ Updated ${lives.length} full live fixtures`);
  } catch (error) {
    console.error("❌ Live score update failed:", error.message);
  }
};
