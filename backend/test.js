import axios from "axios";

const test = async () => {
  const res = await axios.get("https://v3.football.api-sports.io/fixtures", {
    headers: { "x-apisports-key": "5baf95f049ec8c2ebf0a98dcfacee930" },
    params: { league: 39, season: 2024, page: 1 }
  });
  console.log(JSON.stringify(res.data, null, 2));
};

test();
