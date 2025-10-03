// import mongoose from "mongoose";
// import axios from "axios";
// import dotenv from "dotenv";
// import League from "./models/League.js";   // League model

// dotenv.config();

// // ✅ Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// const fetchLeagues = async () => {
//   try {
//     // ✅ Call API-Football leagues endpoint
//     const response = await axios.get("https://v3.football.api-sports.io/leagues", {
//       headers: {
//         "x-apisports-key": process.env.API_KEY,
//       },
//     });

//     const leagues = response.data.response;

//     // ✅ Top Domestic + European Competitions (league IDs)
//     const topLeagueIds = [
//       39, 140, 135, 78, 61, 94,   // domestic leagues
//       2, 3 ,2154                // European competitions
//     ];

//     // ✅ Current year (for filtering active season)
//     const currentYear = new Date().getFullYear();

//     // ✅ Filter only those leagues
//     const filtered = leagues.filter(
//       (l) =>
//         topLeagueIds.includes(l.league.id) &&
//         l.seasons.some((s) => s.year === currentYear && s.current === true)
//     );

//     // ✅ Save or update in MongoDB
//     for (const league of filtered) {
//       // Get current active season year
//       const currentSeason = league.seasons.find((s) => s.current)?.year || currentYear;

//       await League.updateOne(
//         { "league.id": league.league.id }, // match schema
//         {
//           $set: {
//             league: {
//               id: league.league.id,
//               name: league.league.name,
//               type: league.league.type,
//               logo: league.league.logo,
//             },
//             country: {
//               name: league.country.name,
//               code: league.country.code,
//               flag: league.country.flag,
//             },
//             season: currentSeason,  // 👈 save current season
//           },
//         },
//         { upsert: true } // insert if not exists
//       );
//     }

//     console.log("✅ Leagues saved/updated:", filtered.map(l => `${l.league.name} (${l.seasons.find(s => s.current)?.year})`));
//   } catch (err) {
//     console.error("❌ Error fetching leagues:", err.message);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// fetchLeagues();

import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import League from "./models/League.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const topLeagueIds = [39, 140, 135, 78, 61, 94, 2, 3, 32,31,29];

const fetchLeagues = async () => {
  try {
    for (const leagueId of topLeagueIds) {
      const response = await axios.get("https://v3.football.api-sports.io/leagues", {
        headers: { "x-apisports-key": process.env.API_KEY },
        params: { id: leagueId },
      });

      if (!response.data.response || response.data.response.length === 0) {
        console.log(`⚠️ League ${leagueId} not found`);
        continue;
      }

      const leagueData = response.data.response[0];
      const currentSeason = leagueData.seasons.find(s => s.current === true);

      if (!currentSeason) {
        console.log(`⚠️ League ${leagueId} has no current season`);
        continue;
      }

      await League.updateOne(
        { "league.id": leagueData.league.id },
        {
          $set: {
            league: {
              id: leagueData.league.id,
              name: leagueData.league.name,
              type: leagueData.league.type,
              logo: leagueData.league.logo,
            },
            country: {
              name: leagueData.country.name,
              code: leagueData.country.code,
              flag: leagueData.country.flag,
            },
            season: currentSeason.year,
            coverage: currentSeason.coverage,
          },
        },
        { upsert: true }
      );

      console.log(`✅ Saved: ${leagueData.league.name} (${currentSeason.year})`);
      await new Promise(res => setTimeout(res, 500)); // small delay to avoid API rate limit
    }

    console.log("✅ All leagues processed");
  } catch (err) {
    console.error("❌ Error fetching leagues:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchLeagues();
