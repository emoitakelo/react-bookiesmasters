// fetchPredictions.js
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Prediction from "./models/Prediction.js"; 

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.API_KEY;
const API_URL = "https://v3.football.api-sports.io/predictions";

async function fetchPredictions() {
  try {
    // 1. Connect to DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2. Hardcoded fixture IDs (add/remove as needed)
    const fixtureIds = [1377917, 1377914]; 

    if (!fixtureIds.length) {
      console.log("⚠️ No fixture IDs provided");
      return;
    }

    console.log(`🔍 Fetching predictions for ${fixtureIds.length} fixtures`);

    // 3. Loop through hardcoded fixture IDs
    for (const fixtureId of fixtureIds) {
      try {
        const response = await axios.get(API_URL, {
          headers: { "x-apisports-key": API_KEY },
          params: { fixture: fixtureId },
        });

        const predictions = response.data.response;

        if (!predictions.length) {
          console.log(`⚠️ No prediction returned for fixtureId=${fixtureId}`);
          continue;
        }

        // 4. Save/Update prediction in DB
        await Prediction.findOneAndUpdate(
          { fixtureId: fixtureId },                    // match schema
          { fixtureId: fixtureId, ...predictions[0] }, // add fixtureId + API data
          { upsert: true, new: true }
        );

        console.log(`✅ Prediction saved for fixtureId=${fixtureId}`);
      } catch (err) {
        console.error(
          `❌ Error fetching prediction for fixtureId=${fixtureId}:`,
          err.message
        );
      }
    }
  } catch (error) {
    console.error("❌ Script error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

fetchPredictions();
