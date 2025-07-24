const mongoose = require('mongoose');

const FixtureSchema = new mongoose.Schema({
  fixtureId: { type: Number, required: true, unique: true },
  date: { type: String, required: true }, // Add this

  fixture: {
    id: Number,
    date: String,
    timestamp: Number,
    venue: {
      name: String,
      city: String,
    },
    status: {
      long: String,
      short: String,
      elapsed: Number,
    },
  },

  league: {
    id: Number,
    name: String,
    country: String,
    logo: String,
    flag: String,
    season: Number,
    round: String,
  },

  teams: {
    home: {
      id: Number,
      name: String,
      logo: String,
    },
    away: {
      id: Number,
      name: String,
      logo: String,
    },
  },

  goals: {
    home: Number,
    away: Number,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fixture', FixtureSchema);
