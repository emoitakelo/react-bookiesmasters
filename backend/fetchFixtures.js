const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Fixture = require('./models/Fixture'); // Ensure this path is correct

const API_URL = 'https://v3.football.api-sports.io/fixtures';
const API_KEY = process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;

const headers = {
  'x-apisports-key': API_KEY,
};

// ✅ Connect to MongoDB once
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// 🧼 Delete fixtures from 2 days ago
const deleteOldFixtures = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const dateStr = twoDaysAgo.toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    await Fixture.deleteMany({ date: dateStr });
    console.log(`🗑️  Deleted old fixtures from ${dateStr}`);
  } catch (err) {
    console.error(`❌ Error deleting old fixtures for ${dateStr}:`, err.message);
  }
};

// 📅 Format JS Date to YYYY-MM-DD
const formatDate = (dateObj) => {
  return dateObj.toISOString().split('T')[0];
};

// 📥 Fetch fixtures for a specific date
const fetchFixturesForDate = async (dateStr) => {
  try {
    const response = await axios.get(`${API_URL}?date=${dateStr}`, { headers });
    const fixtures = response.data.response;

    for (const fixture of fixtures) {
      const exists = await Fixture.findOne({ fixtureId: fixture.fixture.id });

      if (!exists) {
        const newFixture = new Fixture({
          fixtureId: fixture.fixture.id,
          date: dateStr,
          fixture: fixture.fixture,
          league: fixture.league,
          teams: fixture.teams,
          goals: fixture.goals,
        });

        await newFixture.save();
        console.log(`✅ Saved: ${fixture.teams.home.name} vs ${fixture.teams.away.name} (${dateStr})`);
      } else {
        console.log(`🔁 Skipped duplicate: ${fixture.teams.home.name} vs ${fixture.teams.away.name}`);
      }
    }
  } catch (err) {
    console.error(`❌ Error fetching fixtures for ${dateStr}:`, err.message);
  }
};

// 🏁 Main function
const fetchAllFixtures = async () => {
  await connectDB();
  await deleteOldFixtures();

  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const dates = [yesterday, today, tomorrow].map(formatDate);

  for (const date of dates) {
    await fetchFixturesForDate(date);
  }

  mongoose.connection.close();
  console.log('🚪 MongoDB connection closed');
};

fetchAllFixtures();
