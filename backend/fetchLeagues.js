import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import League from "./models/League.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const topLeagueIds = [
  39, 140, 135, 78, 61, 94, 2, 3, 32, 31, 29, 525, 71, 848,
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Fetch with retry logic (handles API rate limit)
 */
const fetchLeagueWithRetry = async (leagueId, retries = 3) => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/leagues", {
      headers: { "x-apisports-key": process.env.API_KEY },
      params: { id: leagueId },
    });

    if (!response.data.response?.length) {
      console.log(`⚠️ League ${leagueId} not found`);
      return null;
    }

    return response.data.response[0];
  } catch (err) {
    if (err.response?.status === 429 && retries > 0) {
      console.warn(`⏳ Rate limit hit! Retrying League ${leagueId} in 10s...`);
      await delay(10000); // wait 10 seconds
      return fetchLeagueWithRetry(leagueId, retries - 1);
    }
    console.error(`❌ Error fetching League ${leagueId}:`, err.message);
    return null;
  }
};

const fetchLeagues = async () => {
  try {
    for (const leagueId of topLeagueIds) {
      const leagueData = await fetchLeagueWithRetry(leagueId);
      if (!leagueData) continue;

      const currentSeason =
        leagueData.seasons.find(s => s.current) ||
        leagueData.seasons[leagueData.seasons.length - 1];

      if (!currentSeason) {
        console.log(`⚠️ League ${leagueId} has no season info`);
        continue;
      }

      await League.updateOne(
        { "league.id": leagueData.league.id },
        {
          $set: {
            league: {
              id: leagueData.league.id,
              name: leagueData.league.name,
              type: leagueData.league.type,
              logo: leagueData.league.logo,
            },
            country: {
              name: leagueData.country.name,
              code: leagueData.country.code,
              flag: leagueData.country.flag,
            },
            season: currentSeason.year,
            coverage: currentSeason.coverage,
          },
        },
        { upsert: true }
      );

      console.log(`✅ Saved: ${leagueData.league.name} (${currentSeason.year})`);

      // 🔸 safer delay between requests (3s)
      await delay(7000);
    }

    console.log("✅ All leagues processed successfully");
  } catch (err) {
    console.error("❌ Error fetching leagues:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchLeagues();
