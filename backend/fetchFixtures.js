import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Fixture from "./models/Fixture.js";
import League from "./models/League.js";

dotenv.config();

// Small delay helper (2s between calls = safe for API-Football rate limit)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFixtures = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for MongoDB connection...");
      await mongoose.connection.asPromise();
    }

    // ✅ Get ALL leagues
    const leagues = await League.find();

    if (!leagues.length) {
      console.error("❌ No leagues found in DB. Run fetchLeagues.js first.");
      return;
    }

    for (const league of leagues) {
      const leagueId = league.league.id;
      const currentSeason = league.season;

      // Loop through 6 seasons (current + 5 previous)
      for (let i = 0; i < 6; i++) {
        const seasonYear = currentSeason - i;

        console.log(`🔍 Fetching fixtures for leagueId=${leagueId}, season=${seasonYear}...`);

        try {
          const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
            headers: { "x-apisports-key": process.env.API_KEY },
            params: { league: leagueId, season: seasonYear }
          });

          const fixtures = response.data.response;

          if (!fixtures || fixtures.length === 0) {
            console.log(`⚠️ No fixtures found for leagueId=${leagueId}, season=${seasonYear}`);
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
            console.log(`✅ Fixtures saved/updated: ${savedCount} (Season ${seasonYear})`);
          }
        } catch (err) {
          console.error(`❌ Error fetching leagueId=${leagueId}, season=${seasonYear}:`, err.message);
        }

        // ⏳ Add delay between each call (2s safe for API-Football)
        await delay(2000);
      }
    }

  } catch (err) {
    console.error("❌ Error fetching fixtures:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    fetchFixtures();
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
