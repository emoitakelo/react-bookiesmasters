import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import League from "./models/League.js"; // adjust path if needed

dotenv.config();

const API_URL = "https://v3.football.api-sports.io/leagues";

/**
 * Return the most recent season object that satisfies the given predicate.
 */
function findLatestSeasonMatching(seasons = [], predicate = () => false) {
  if (!Array.isArray(seasons) || seasons.length === 0) return null;
  const matching = seasons.filter(predicate);
  if (matching.length === 0) return null;
  return matching.reduce((a, b) => ((a.year || 0) > (b.year || 0) ? a : b));
}

async function fetchAndSaveLeaguesWithPredictions() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const res = await axios.get(API_URL, {
      headers: { "x-apisports-key": process.env.API_KEY },
      timeout: 20000,
    });

    const allLeagues = res.data?.response || [];
    console.log(`\nℹ️  Total leagues returned by API: ${allLeagues.length}`);

    // ✅ Filter leagues with full coverage including fixture stats
    const predicate = (season) => {
      const cov = season?.coverage;
      const fix = cov?.fixtures;
      return (
        cov &&
        cov.predictions === true &&
        cov.odds === true &&
        cov.standings === true &&
        cov.top_scorers === true &&
        fix?.statistics_fixtures === true &&
        fix?.statistics_players === true
      );
    };

    const leaguesToSave = [];

    for (const l of allLeagues) {
      if (!l?.league || !l.seasons) continue;

      const matchedSeason = findLatestSeasonMatching(l.seasons, predicate);
      if (!matchedSeason) continue;

      const leagueDoc = {
        league: {
          id: l.league.id,
          name: l.league.name,
          type: l.league.type,
          logo: l.league.logo,
        },
        country: {
          name: l.country?.name || null,
          code: l.country?.code || null,
          flag: l.country?.flag || null,
        },
        season: matchedSeason.year,
        coverage: matchedSeason.coverage,
      };

      leaguesToSave.push(leagueDoc);
    }

    console.log(
      `📊 Found ${leaguesToSave.length} leagues with full coverage (predictions, odds, standings, top_scorers, fixture stats).`
    );

    for (const doc of leaguesToSave) {
      await League.updateOne(
        { "league.id": doc.league.id },
        { $set: doc },
        { upsert: true }
      );
    }

    console.log("✅ Leagues saved/updated successfully.\n➡️  Saved leagues:");
    leaguesToSave.forEach((it) =>
      console.log(
        `   • ${it.league.name} (${it.country.name || "Unknown"}) — season ${it.season}`
      )
    );
  } catch (error) {
    console.error("❌ Error fetching/saving leagues:", error.message || error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 MongoDB connection closed.");
  }
}

fetchAndSaveLeaguesWithPredictions();
