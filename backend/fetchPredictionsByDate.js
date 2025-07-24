const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Prediction = require('./models/Prediction');

const API_KEY = process.env.API_KEY;
const MONGODB_URI = process.env.MONGO_URI;
const API_BASE = 'https://v3.football.api-sports.io';

// Axios headers
const headers = {
  'x-apisports-key': API_KEY,
};

// Utility: Shuffle array
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

// Connect to DB and run
const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    const today = new Date().toISOString().split('T')[0]; // e.g., 2025-07-20
    await fetchAndStorePredictions(today);
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

// Fetch fixtures + predictions
const fetchAndStorePredictions = async (targetDate) => {
  try {
    const fixturesRes = await axios.get(`${API_BASE}/fixtures`, {
      headers,
      params: {
        date: targetDate,
        timezone: 'Africa/Nairobi',
      },
    });

    const fixtures = fixturesRes.data.response;
    console.log(`📅 Fetched ${fixtures.length} fixtures for ${targetDate}`);

    if (!fixtures.length) {
      console.log('⚠️ No fixtures found for the given date.');
      return;
    }

    const predictionResults = [];

    for (const fixture of fixtures) {
      const fixtureId = fixture.fixture?.id;
      if (!fixtureId) continue;

      try {
        const predRes = await axios.get(`${API_BASE}/predictions`, {
          headers,
          params: { fixture: fixtureId },
        });

        const prediction = predRes.data.response[0];

        if (
          prediction?.fixture?.id &&
          prediction?.league &&
          prediction?.teams &&
          prediction?.predictions
        ) {
          predictionResults.push(prediction);
        }

        if (predictionResults.length >= 10) break;
      } catch (err) {
        console.warn(`⚠️ No prediction for fixture ${fixtureId}`);
      }

      await new Promise((res) => setTimeout(res, 300)); // delay
    }

    if (!predictionResults.length) {
      console.log('❌ No valid predictions found.');
      return;
    }

    const selectedPredictions = shuffleArray(predictionResults).slice(0, 10);

    for (const pred of selectedPredictions) {
      try {
        await Prediction.updateOne(
          { fixtureId: pred.fixture.id },
          {
            $set: {
              fixtureId: pred.fixture.id,
              fixture: pred.fixture,
              league: pred.league,
              teams: pred.teams,
              predictions: pred.predictions,
              comparison: pred.comparison,
              h2h: pred.h2h || [],
            },
          },
          { upsert: true }
        );
        console.log(`✅ Saved: ${pred.teams.home.name} vs ${pred.teams.away.name}`);
      } catch (err) {
        console.error(`❌ Error saving fixture ${pred.fixture.id}:`, err.message);
      }
    }

    console.log(`🎯 Saved ${selectedPredictions.length} predictions.`);
  } catch (err) {
    console.error('❌ Error during fetch/store:', err.message);
  }
};

start();
