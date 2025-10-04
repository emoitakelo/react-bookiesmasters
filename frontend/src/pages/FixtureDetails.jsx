import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const FixtureDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  // small helper to safely dig into nested prediction shapes
  const getPredictionField = (predRoot, path = []) => {
    if (!predRoot) return undefined;
    return path.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), predRoot);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError(null);
        const res = await axiosInstance.get(`/fixtures/${id}/details`);
        setDetails(res.data);
      } catch (err) {
        console.error("Error fetching fixture details:", err);
        setError(err?.response?.data?.message || err.message || "Failed to load details");
      }
    };
    fetchDetails();
  }, [id]);

  if (error)
    return (
      <div className="p-4 min-h-screen text-white bg-black">
        <Link to="/fixtures" className="text-gray-400 underline mb-4 inline-block">
          ← Back to fixtures
        </Link>
        <p className="text-red-400">Error: {error}</p>
      </div>
    );

  if (!details) return <p className="text-white text-center mt-10">Loading...</p>;

  // normalize top-level fields
  const fixture = details.fixture || {};
  const league = details.league || {};
  const teams = details.teams || {};
  const score = details.score || { fulltime: { home: null, away: null } };
  const venue = details.venue || fixture.venue || { name: "Unknown" };
  const referee = fixture.referee ?? "Unknown";

  // prediction checks
  const predRoot = details.prediction ?? details.predictions ?? null;
  const advice =
    getPredictionField(predRoot, ["advice"]) ??
    getPredictionField(predRoot, ["predictions", "advice"]) ??
    getPredictionField(predRoot, ["predictions", 0, "advice"]) ??
    null;

  const winnerName =
    getPredictionField(predRoot, ["predictions", "winner", "name"]) ??
    getPredictionField(predRoot, ["predictions", 0, "winner", "name"]) ??
    getPredictionField(predRoot, ["winner", "name"]) ??
    null;

  const percent =
    getPredictionField(predRoot, ["percent"]) ??
    getPredictionField(predRoot, ["predictions", "percent"]) ??
    getPredictionField(predRoot, ["predictions", 0, "percent"]) ??
    null;

  const comparison = details.comparison ?? predRoot?.comparison ?? null;

  const h2h = Array.isArray(details.h2h)
    ? details.h2h
    : Array.isArray(predRoot?.h2h)
    ? predRoot.h2h
    : [];

  // determine favorite
  let favorite = null;
  if (percent) {
    const pHome = Number((percent.home ?? "").replace("%", "")) || 0;
    const pAway = Number((percent.away ?? "").replace("%", "")) || 0;
    if (pHome > pAway) favorite = "home";
    else if (pAway > pHome) favorite = "away";
  }
  if (!favorite && winnerName) {
    if (winnerName === teams.home?.name) favorite = "home";
    else if (winnerName === teams.away?.name) favorite = "away";
  }

  const matchDate = fixture.date ? new Date(fixture.date) : null;
  const dateStr = matchDate ? matchDate.toLocaleDateString() : "TBA";
  const timeStr = matchDate ? matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="p-4 min-h-screen text-white bg-black">
      <Link to="/fixtures" className="text-gray-400 underline mb-4 inline-block">
        ← Back to fixtures
      </Link>

      {/* League */}
      <div className="flex items-center gap-2 mb-4">
        {league.logo && <img src={league.logo} alt={league.name} className="w-6 h-6" />}
        <h2 className="font-bold text-lg">{league.name || "Unknown League"}</h2>
      </div>

      {/* Prediction Tip / Advice */}
      {advice ? (
        <div className="mb-2 text-center p-2 bg-gray-800 rounded font-semibold text-yellow-400">{advice}</div>
      ) : (
        <div className="mb-2 text-center p-2 bg-gray-800 rounded text-gray-400">No prediction advice available</div>
      )}

      {/* Teams & Score */}
      <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-2">
        <div className={`flex-1 flex flex-col items-center ${favorite === "home" ? "bg-gray-800 rounded-lg p-2" : ""}`}>
          {teams.home?.logo && <img src={teams.home.logo} alt={teams.home?.name} className="w-12 h-12 mb-1" />}
          <span className="font-semibold">{teams.home?.name ?? "Home"}</span>
        </div>

        <div className="text-center font-bold">
          {score.fulltime?.home ?? "-"} - {score.fulltime?.away ?? "-"}
          <div className="text-gray-400 text-sm">
            {timeStr} {dateStr}
          </div>
          {winnerName && <div className="text-gray-400 text-xs mt-1">Predicted: {winnerName}</div>}
        </div>

        <div className={`flex-1 flex flex-col items-center ${favorite === "away" ? "bg-gray-800 rounded-lg p-2" : ""}`}>
          {teams.away?.logo && <img src={teams.away.logo} alt={teams.away?.name} className="w-12 h-12 mb-1" />}
          <span className="font-semibold">{teams.away?.name ?? "Away"}</span>
        </div>
      </div>

      {/* Venue & Referee */}
      <div className="mb-4 text-gray-400 text-center">
        <div>Venue: {venue?.name ?? "Unknown"}</div>
        <div>Referee: {referee ?? "Unknown"}</div>
      </div>

      {/* H2H */}
      <div className="mb-4 p-4 bg-gray-800 rounded">
        <h3 className="font-semibold mb-2">Head-to-Head</h3>
        {Array.isArray(h2h) && h2h.length > 0 ? (
          <div className="flex flex-col gap-2">
            {h2h.map((m, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
                <span className="w-20">{m.fixture?.date ? new Date(m.fixture.date).toLocaleDateString() : "TBA"}</span>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {m.teams?.home?.logo && <img src={m.teams.home.logo} alt={m.teams.home.name} className="w-5 h-5" />}
                    <span>{m.teams?.home?.name ?? "Home"}</span>
                  </div>

                  <span className="font-semibold">
                    {m.goals?.home ?? (m.score?.fulltime?.home ?? "-")} - {m.goals?.away ?? (m.score?.fulltime?.away ?? "-")}
                  </span>

                  <div className="flex items-center gap-1">
                    <span>{m.teams?.away?.name ?? "Away"}</span>
                    {m.teams?.away?.logo && <img src={m.teams.away.logo} alt={m.teams.away.name} className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No H2H data available</div>
        )}
      </div>

      {/* Recent Matches - Home */}
      <div className="mb-4 p-4 bg-gray-800 rounded">
        <h3 className="font-semibold mb-2">Recent Matches - {teams.home?.name ?? "Home"}</h3>
        {details.recent?.home && details.recent.home.length > 0 ? (
          <div className="flex flex-col gap-2">
            {details.recent.home.map((m, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
                <span className="w-20">{m.fixture?.date ? new Date(m.fixture.date).toLocaleDateString() : "TBA"}</span>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {m.teams?.home?.logo && <img src={m.teams.home.logo} alt={m.teams.home.name} className="w-5 h-5" />}
                    <span>{m.teams?.home?.name ?? "Home"}</span>
                  </div>

                  <span className="font-semibold">
                    {m.goals?.home ?? (m.score?.fulltime?.home ?? "-")} - {m.goals?.away ?? (m.score?.fulltime?.away ?? "-")}
                  </span>

                  <div className="flex items-center gap-1">
                    <span>{m.teams?.away?.name ?? "Away"}</span>
                    {m.teams?.away?.logo && <img src={m.teams.away.logo} alt={m.teams.away.name} className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No recent matches found</div>
        )}
      </div>

      {/* Recent Matches - Away */}
      <div className="mb-4 p-4 bg-gray-800 rounded">
        <h3 className="font-semibold mb-2">Recent Matches - {teams.away?.name ?? "Away"}</h3>
        {details.recent?.away && details.recent.away.length > 0 ? (
          <div className="flex flex-col gap-2">
            {details.recent.away.map((m, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
                <span className="w-20">{m.fixture?.date ? new Date(m.fixture.date).toLocaleDateString() : "TBA"}</span>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {m.teams?.home?.logo && <img src={m.teams.home.logo} alt={m.teams.home.name} className="w-5 h-5" />}
                    <span>{m.teams?.home?.name ?? "Home"}</span>
                  </div>

                  <span className="font-semibold">
                    {m.goals?.home ?? (m.score?.fulltime?.home ?? "-")} - {m.goals?.away ?? (m.score?.fulltime?.away ?? "-")}
                  </span>

                  <div className="flex items-center gap-1">
                    <span>{m.teams?.away?.name ?? "Away"}</span>
                    {m.teams?.away?.logo && <img src={m.teams.away.logo} alt={m.teams.away.name} className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No recent matches found</div>
        )}
      </div>

      {/* Comparison bars */}
      {comparison ? (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold mb-2">Comparison</h3>
          {["form", "att", "def", "goals", "total", "h2h"].map((key) => {
            const comp = comparison[key];
            if (!comp) return null;
            const homeVal = comp.home ?? comp.home?.toString();
            const awayVal = comp.away ?? comp.away?.toString();

            const tryPercent = (v) => {
              if (!v && v !== 0) return 50;
              const n = Number(String(v).replace(/[^0-9.]/g, ""));
              return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 50;
            };

            const homePct = tryPercent(homeVal);
            const awayPct = 100 - homePct;

            return (
              <div key={key} className="mb-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="capitalize">{key}</span>
                  <span>
                    {String(homeVal ?? "-")} vs {String(awayVal ?? "-")}
                  </span>
                </div>
                <div className="w-full bg-gray-900 h-4 rounded overflow-hidden">
                  <div style={{ width: `${homePct}%` }} className="h-4 rounded-l bg-teal-500 inline-block"></div>
                  <div style={{ width: `${awayPct}%` }} className="h-4 rounded-r bg-gray-700 inline-block"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-4 text-gray-400">No comparison data available</div>
      )}
    </div>
  );
};

export default FixtureDetails;
