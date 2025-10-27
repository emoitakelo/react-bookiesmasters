import mongoose from "mongoose";

const liveScoreSchema = new mongoose.Schema(
  {
    fixtureId: { type: Number, required: true, unique: true },
    league: { type: String },
    homeTeam: {
      id: Number,
      name: String,
      logo: String,
      score: { type: Number, default: null },
    },
    awayTeam: {
      id: Number,
      name: String,
      logo: String,
      score: { type: Number, default: null },
    },
    status: {
      short: { type: String }, // e.g., "1H", "2H", "FT"
      elapsed: { type: Number, default: 0 }, // e.g., 45
    },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in dev/hot reload
export default mongoose.models.LiveScore ||
  mongoose.model("LiveScore", liveScoreSchema);
