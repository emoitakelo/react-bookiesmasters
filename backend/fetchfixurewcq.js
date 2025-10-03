// fetchFixturesByDate.js
import axios from "axios";

// 🔑 Replace with your actual API-Football key
const API_KEY = "5baf95f049ec8c2ebf0a98dcfacee930";

const fetchFixtures = async () => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: {
        "x-apisports-key": API_KEY,
      },
      params: {
        date: "2025-10-8", // 👈 Change date if needed
      },
    });

    console.log("✅ Fixtures on 2025-10-10:");
    response.data.response.forEach((fix) => {
      console.log(
        `Fixture: ${fix.teams.home.name} vs ${fix.teams.away.name} | League: ${fix.league.name} (ID: ${fix.league.id})`
      );
    });
  } catch (err) {
    console.error("❌ Error fetching fixtures:", err.message);
  }
};

fetchFixtures();
