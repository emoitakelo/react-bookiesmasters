// fetchPrediction.js
const axios = require('axios');
const mongoose = require('mongoose');
const Prediction = require('./models/Prediction');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_URL = 'https://v3.football.api-sports.io';
const headers = { 'x-apisports-key': API_KEY };

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

const fetchAndSavePrediction = async (fixtureId) => {
  try {
    // 1. Fetch prediction
    const predictionRes = await axios.get(
      `${API_URL}/predictions?fixture=${fixtureId}`,
      { headers }
    );
    const predictionData = predictionRes.data.response[0];

    if (!predictionData) {
      console.log('❌ No prediction data found for this fixture');
      return;
    }

    // 2. Fetch fixture info to get date
    const fixtureRes = await axios.get(
      `${API_URL}/fixtures?id=${fixtureId}`,
      { headers }
    );
    const fixtureInfo = fixtureRes.data.response[0];
    const fixtureDate = fixtureInfo?.fixture?.date || null;

    // 3. Save prediction with fixtureId and fixtureDate
    const existing = await Prediction.findOne({ fixtureId });

    if (existing) {
      console.log('ℹ️ Prediction already exists for fixtureId:', fixtureId);
      return;
    }

    const newPrediction = new Prediction({
      fixtureId,
      ...predictionData,
      fixture: {
        ...(predictionData.fixture || {}),
        date: fixtureDate ? new Date(fixtureDate) : null,
      },
    });

    await newPrediction.save();
    console.log('✅ Prediction saved for fixture:', fixtureId);
  } catch (err) {
    console.error('❌ Error fetching prediction:', err.message);
  }
};

const start = async () => {
  await connectDB();
  const fixtureId = '1342545'; // Change this to your target fixture ID
  await fetchAndSavePrediction(fixtureId);
};

start();
