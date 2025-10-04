// fetchPredictions.js
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Fixture from "./models/Fixture.js";
import Prediction from "./models/Prediction.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.API_KEY;
const API_URL = "https://v3.football.api-sports.io/predictions";

// Helper: delay between requests
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchPredictions() {
  try {
    // 1. Connect to DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2. Hardcoded date (change this when needed)
    const today = "2025-10-05"; // YYYY-MM-DD

    // Convert to UNIX timestamp range
    const start = Math.floor(new Date(`${today}T00:00:00Z`).getTime() / 1000);
    const end = Math.floor(new Date(`${today}T23:59:59Z`).getTime() / 1000);

    // 3. Find fixtures for today using timestamp
    const fixtures = await Fixture.find({
      "fixture.timestamp": { $gte: start, $lte: end },
    });

    if (!fixtures.length) {
      console.log(`⚠️ No fixtures found for ${today}`);
      return;
    }

    console.log(`🔍 Found ${fixtures.length} fixtures for ${today}`);

    // 4. Fetch predictions for each fixture with delay + retry
    for (const fixture of fixtures) {
      const fixtureId = Number(fixture.fixture.id);

      try {
        let response = await axios.get(API_URL, {
          headers: { "x-apisports-key": API_KEY },
          params: { fixture: fixtureId },
        });

        let predictions = response.data.response;

        // Retry if no predictions first time
        if (!predictions.length) {
          console.log(`⚠️ No prediction on first attempt for fixtureId=${fixtureId}, retrying...`);
          await delay(1500); // wait 1.5s before retry
          response = await axios.get(API_URL, {
            headers: { "x-apisports-key": API_KEY },
            params: { fixture: fixtureId },
          });
          predictions = response.data.response;
        }

        if (!predictions.length) {
          console.log(
            `⚠️ No prediction returned even after retry for fixtureId=${fixtureId}`,
            JSON.stringify(response.data, null, 2) // log raw response for debugging
          );
          continue;
        }

        // 5. Save/Update prediction in DB
        await Prediction.findOneAndUpdate(
          { fixtureId },
          { fixtureId, ...predictions[0] },
          { upsert: true, new: true }
        );

        console.log(`✅ Prediction saved for fixtureId=${fixtureId}`);
      } catch (err) {
        console.error(
          `❌ Error fetching prediction for fixtureId=${fixtureId}:`,
          err.message
        );
      }

      // Delay before next request (to avoid rate limit/caching issues)
      await delay(7000);
    }
  } catch (error) {
    console.error("❌ Script error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

fetchPredictions();
