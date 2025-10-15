import Fixture from "../models/Fixture.js";
import Prediction from "../models/Prediction.js";
import { mergeFixturesPredictions } from "../helpers/fixtureMerger.js";

/**
 * Fetches today's fixtures and their predictions,
 * merges + groups them by league for frontend display.
 */
export const getTodayPredictionsService = async () => {
  try {
    // 1️⃣ Determine today's date in YYYY-MM-DD (UTC)
    const today = new Date().toISOString().split("T")[0];

    // 2️⃣ Fetch all fixtures scheduled for today
    const fixtures = await Fixture.find({
      "fixture.date": { $regex: today, $options: "i" },
    });

    // 3️⃣ Get all fixture IDs from today’s fixtures
    const fixtureIds = fixtures.map((f) => f.fixture.id);

    // 4️⃣ Fetch all predictions that match those fixture IDs
    const predictions = await Prediction.find({
      fixtureId: { $in: fixtureIds },
    });


    // if (predictions.length > 0) {
    //   console.log(
    //     "🧩 SAMPLE prediction structure:",
    //     JSON.stringify(predictions[0], null, 2)
    //   );
    // } else {
    //   console.log("⚠️ No predictions found for today to inspect structure.");
    // }

    // 5️⃣ Merge and group fixtures + predictions (via helper)
    // NOTE: The helper already groups them by league.
    const groupedPredictions = mergeFixturesPredictions(fixtures, predictions);

// console.log("✅ Grouped Predictions after merge:", JSON.stringify(groupedPredictions, null, 2));



    // 6️⃣ Return the grouped data
    return groupedPredictions;

  } catch (error) {
    console.error("❌ Error in getTodayPredictionsService:", error.message);
    throw new Error("Failed to fetch today's predictions");
  }
};
