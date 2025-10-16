// fetchSpecificLeagues.js
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Fixture from "./models/Fixture.js";

dotenv.config();

// Small delay helper (2s between calls = safe for API-Football rate limit)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFixturesForSpecificLeagues = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for MongoDB connection...");
      await mongoose.connection.asPromise();
    }

    // ✅ The leagues you want to fetch
    const targetLeagueIds = [525, 71, 848]; // World Cup, Euros, Copa America etc.

    // ✅ Current year
    const currentYear = new Date().getFullYear();

    for (const leagueId of targetLeagueIds) {
      console.log(`\n🔍 Processing leagueId=${leagueId}...`);

      // Loop through 6 seasons (current + 5 previous)
      for (let i = 0; i < 6; i++) {
        const seasonYear = currentYear - i;

        console.log(`   ➡️ Fetching fixtures for leagueId=${leagueId}, season=${seasonYear}`);

        try {
          const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
            headers: { "x-apisports-key": process.env.API_KEY },
            params: { league: leagueId, season: seasonYear },
          });

          const fixtures = response.data.response;

          if (!fixtures || fixtures.length === 0) {
            console.log(`   ⚠️ No fixtures found for leagueId=${leagueId}, season=${seasonYear}`);
          } else {
            let savedCount = 0;
            for (const f of fixtures) {
              await Fixture.updateOne(
                { "fixture.id": f.fixture.id },
                { $set: f },
                { upsert: true }
              );
              savedCount++;
            }
            console.log(`   ✅ Fixtures saved/updated: ${savedCount} (Season ${seasonYear})`);
          }
        } catch (err) {
          console.error(`   ❌ Error fetching leagueId=${leagueId}, season=${seasonYear}:`, err.message);
        }

        // ⏳ Add delay between each call
        await delay(2000);
      }
    }

  } catch (err) {
    console.error("❌ Error in fetchFixturesForSpecificLeagues:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    fetchFixturesForSpecificLeagues();
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
