// fetchPredictions.js
import mongoose from "mongoose";
import axios from "axios";
import Fixture from "./models/Fixture.js";
import Prediction from "./models/Prediction.js";

// ⚠️ Hardcode your API key here
const API_KEY = "5baf95f049ec8c2ebf0a98dcfacee930";

// Small delay helper (to respect rate limits)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPredictionsForDate = async (targetDate) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for MongoDB connection...");
      await mongoose.connection.asPromise();
    }

    // ✅ Normalize date range for the given day
    const startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    console.log(`🔍 Fetching fixtures for ${startOfDay.toISOString().split("T")[0]}...`);

    // ✅ Get fixtures from MongoDB for that day
    const fixtures = await Fixture.find({
      "fixture.date": { $gte: startOfDay.toISOString(), $lte: endOfDay.toISOString() },
    });

    if (!fixtures.length) {
      console.log("⚠️ No fixtures found for this date.");
      return;
    }

    console.log(`✅ Found ${fixtures.length} fixtures. Fetching predictions...`);

    // ✅ Loop through fixtures and fetch predictions
    for (const f of fixtures) {
      const fixtureId = f.fixture.id;

      try {
        const response = await axios.get("https://v3.football.api-sports.io/predictions", {
          headers: { "x-apisports-key": API_KEY },
          params: { fixture: fixtureId },
        });

        const data = response.data.response[0];

        if (!data) {
          console.log(`⚠️ No prediction found for fixtureId=${fixtureId}`);
          continue;
        }

        // ✅ Save / update in Predictions collection
        await Prediction.updateOne(
          { fixtureId: fixtureId },
          { $set: { fixtureId: fixtureId, ...data } },
          { upsert: true }
        );

        console.log(`✅ Prediction saved for fixtureId=${fixtureId}`);
      } catch (err) {
        console.error(`❌ Error fetching prediction for fixtureId=${fixtureId}:`, err.message);
      }

      // ⏳ Delay between API calls (avoid hitting rate limit)
      await delay(2000);
    }

    console.log("🎉 All predictions processed.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

// ✅ Connect and run
mongoose
  .connect("mongodb+srv://emoitakelo:Hdb21200562017!@fixtures.ireanrw.mongodb.net/test?retryWrites=true&w=majority&appName=fixtures"
, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    // 👇 change this date as needed
    fetchPredictionsForDate("2025-10-04");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
