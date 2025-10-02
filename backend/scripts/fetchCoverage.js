// scripts/fetchCoverage.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchEPLCoverage = async () => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/leagues", {
      headers: {
        "x-apisports-key": process.env.API_KEY,
      },
      params: {
        id: 39,        // EPL league id
        season: 2024,  // EPL active season in API-Football right now
      },
    });

    const leagues = response.data.response;
    console.log("Full response:", JSON.stringify(leagues, null, 2));

    if (leagues.length > 0) {
      const epl = leagues[0];
      console.log("Coverage for EPL:", JSON.stringify(epl.coverage, null, 2));
    } else {
      console.log("No league data returned for EPL");
    }
  } catch (err) {
    console.error("Error fetching EPL coverage:", err.message, err.response?.data);
  }
};

fetchEPLCoverage();
