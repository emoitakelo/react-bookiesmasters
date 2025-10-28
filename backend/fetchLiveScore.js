// fetchLiveFixtures.js
import fetch from "node-fetch";

// ⚠️ Replace with your actual API key
const API_KEY = "5baf95f049ec8c2ebf0a98dcfacee930";
const fetchLiveFixtures = async () => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Full API-Football Live Fixtures Response:\n");
    console.dir(data, { depth: null, colors: true });
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
  }
};

fetchLiveFixtures();
