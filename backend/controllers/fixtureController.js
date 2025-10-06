// controllers/fixtureController.js
import Fixture from "../models/Fixture.js";

export const getFixturesByDate = async (req, res) => {
  try {
    const { date } = req.params; // e.g. "2025-10-04"

    const startOfDay = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    const endOfDay   = Math.floor(new Date(`${date}T23:59:59Z`).getTime() / 1000);

    const fixtures = await Fixture.aggregate([
      // match day
      { $match: { "fixture.timestamp": { $gte: startOfDay, $lte: endOfDay } } },

      // sort as you want
      { $sort: { "league.id": 1, "fixture.timestamp": 1 } },

      // join predictions collection (make sure 'predictions' is the actual collection name)
      {
        $lookup: {
          from: "predictions",            // <-- collection name in MongoDB
          localField: "fixture.id",       // fixture.fixture.id in docs
          foreignField: "fixtureId",      // predictions.fixtureId in predictions doc
          as: "prediction_docs"
        }
      },

      // take first prediction doc (if exists) and put it in `predictions`
      {
        $addFields: {
          predictions: {
            $cond: [
              { $gt: [{ $size: "$prediction_docs" }, 0] },
              { $arrayElemAt: ["$prediction_docs", 0] },
              null
            ]
          }
        }
      },

      // remove helper array
      { $project: { prediction_docs: 0 } }
    ]);

    return res.json(fixtures);
  } catch (err) {
    console.error("Error getFixturesByDate:", err);
    return res.status(500).json({ message: err.message });
  }
};
