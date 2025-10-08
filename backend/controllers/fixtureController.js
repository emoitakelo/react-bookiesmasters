// // controllers/fixtureController.js
// import Fixture from "../models/Fixture.js";

// export const getFixturesByDate = async (req, res) => {
//   try {
//     const { date } = req.params; // e.g. "2025-10-04"

//     const startOfDay = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
//     const endOfDay   = Math.floor(new Date(`${date}T23:59:59Z`).getTime() / 1000);

//     const fixtures = await Fixture.aggregate([
//       // match day
//       { $match: { "fixture.timestamp": { $gte: startOfDay, $lte: endOfDay } } },

//       // sort as you want
//       { $sort: { "league.id": 1, "fixture.timestamp": 1 } },

//       // join predictions collection (make sure 'predictions' is the actual collection name)
//       {
//         $lookup: {
//           from: "predictions",            // <-- collection name in MongoDB
//           localField: "fixture.id",       // fixture.fixture.id in docs
//           foreignField: "fixtureId",      // predictions.fixtureId in predictions doc
//           as: "prediction_docs"
//         }
//       },

//       // take first prediction doc (if exists) and put it in `predictions`
//       {
//         $addFields: {
//           predictions: {
//             $cond: [
//               { $gt: [{ $size: "$prediction_docs" }, 0] },
//               { $arrayElemAt: ["$prediction_docs", 0] },
//               null
//             ]
//           }
//         }
//       },

//       // remove helper array
//       { $project: { prediction_docs: 0 } }
//     ]);

//     return res.json(fixtures);
//   } catch (err) {
//     console.error("Error getFixturesByDate:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };


import Fixture from "../models/Fixture.js";

// 🧩 Get all fixtures (used to find available dates with predictions)
export const getAllFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.aggregate([
      // join predictions to each fixture
      {
        $lookup: {
          from: "predictions",         // MongoDB collection name
          localField: "fixture.id",
          foreignField: "fixtureId",
          as: "prediction_docs",
        },
      },
      {
        $addFields: {
          predictions: {
            $cond: [
              { $gt: [{ $size: "$prediction_docs" }, 0] },
              { $arrayElemAt: ["$prediction_docs", 0] },
              null,
            ],
          },
        },
      },
      { $project: { prediction_docs: 0 } },
      { $sort: { "fixture.timestamp": 1 } }, // optional: sort by date ascending
    ]);

    return res.json(fixtures);
  } catch (err) {
    console.error("Error fetching all fixtures:", err);
    return res.status(500).json({ message: err.message });
  }
};

// 🗓️ Get fixtures by specific date
export const getFixturesByDate = async (req, res) => {
  try {
    const { date } = req.params; // e.g. "2025-10-04"

    const startOfDay = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    const endOfDay = Math.floor(new Date(`${date}T23:59:59Z`).getTime() / 1000);

    const fixtures = await Fixture.aggregate([
      // Match fixtures for that day
      { $match: { "fixture.timestamp": { $gte: startOfDay, $lte: endOfDay } } },

      // Sort by league and time
      { $sort: { "league.id": 1, "fixture.timestamp": 1 } },

      // Join predictions
      {
        $lookup: {
          from: "predictions",
          localField: "fixture.id",
          foreignField: "fixtureId",
          as: "prediction_docs",
        },
      },
      {
        $addFields: {
          predictions: {
            $cond: [
              { $gt: [{ $size: "$prediction_docs" }, 0] },
              { $arrayElemAt: ["$prediction_docs", 0] },
              null,
            ],
          },
        },
      },
      { $project: { prediction_docs: 0 } },
    ]);

    return res.json(fixtures);
  } catch (err) {
    console.error("Error getFixturesByDate:", err);
    return res.status(500).json({ message: err.message });
  }
};
