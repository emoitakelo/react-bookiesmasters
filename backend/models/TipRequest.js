const mongoose = require('mongoose');

const TipRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true
  },
  consent: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String
  },
  userEmail: {
    type: String
  }
}, {
  timestamps: true // ✅ Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('TipRequest', TipRequestSchema);
