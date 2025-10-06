// updateFixturesCurrentSeason.js
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Fixture from "./models/Fixture.js";
import League from "./models/League.js";

dotenv.config();

// 2-second delay between calls to avoid hitting API rate limits
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const updateFixturesCurrentSeason = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for MongoDB connection...");
      await mongoose.connection.asPromise();
    }

    // ✅ Fetch all saved leagues
    const leagues = await League.find();

    if (!leagues.length) {
      console.error("❌ No leagues found in DB. Run fetchLeagues.js first.");
      return;
    }

    for (const league of leagues) {
      const leagueId = league.league?.id;
      const season = league.season;

      if (!leagueId || !season) {
        console.log(`⚠️ Skipping invalid league entry:`, league);
        continue;
      }

      console.log(`🔍 Fetching fixtures for leagueId=${leagueId}, season=${season}...`);

      try {
        const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
          headers: { "x-apisports-key": process.env.API_KEY },
          params: { league: leagueId, season: season },
        });

        const fixtures = response.data.response;

        if (!fixtures || fixtures.length === 0) {
          console.log(`⚠️ No fixtures found for leagueId=${leagueId}, season=${season}`);
          continue;
        }

        let updatedCount = 0;

        for (const f of fixtures) {
          await Fixture.updateOne(
            { "fixture.id": f.fixture.id },
            { $set: f },
            { upsert: true } // ✅ Update if exists, insert if missing
          );
          updatedCount++;
        }

        console.log(`✅ Updated ${updatedCount} fixtures for leagueId=${leagueId} (Season ${season})`);
      } catch (err) {
        console.error(`❌ Error fetching leagueId=${leagueId}, season=${season}:`, err.message);
      }

      await delay(2000); // Wait 2 seconds between each league call
    }

    console.log("🎯 All current season fixtures updated successfully!");
  } catch (err) {
    console.error("❌ Error updating fixtures:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    updateFixturesCurrentSeason();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
