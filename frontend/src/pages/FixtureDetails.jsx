// src/pages/FixtureDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const SkeletonLoader = () => (
  <div className="max-w-4xl mx-auto px-4 py-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
  </div>
);

const FixtureDetail = () => {
  const { id } = useParams();
  const [fixtureData, setFixtureData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        // fetch fixture details
        const res = await axiosInstance.get(`/fixtures/${id}`);
        setFixtureData(res.data);

        // fetch prediction details
        const predRes = await axiosInstance.get(`/predictions/${id}`);
        setPrediction(predRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch fixture details");
      } finally {
        setLoading(false);
      }
    };
    fetchFixture();
  }, [id]);

  if (loading) return <SkeletonLoader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!fixtureData) return <p className="text-center">No fixture found</p>;

  const { fixture: fx, teams, venue, referee, h2h, last5, standings } = fixtureData;

  const renderComparisonBar = (label, homeValue, awayValue) => {
    const home = parseFloat(homeValue) || 0;
    const away = parseFloat(awayValue) || 0;
    const total = home + away || 1;
    const homePercent = Math.round((home / total) * 100);
    const awayPercent = 100 - homePercent;

    return (
      <div key={label} className="mb-2">
        <div className="text-center mb-1 capitalize text-gray-300">{label}</div>
        <div className="flex w-full h-5 bg-gray-700 rounded overflow-hidden text-xs font-semibold text-white">
          <div
            className="bg-teal-600 flex items-center justify-center"
            style={{ width: `${homePercent}%` }}
          >
            {homePercent > 10 && <span>{homePercent}%</span>}
          </div>
          <div
            className="bg-gray-500 flex items-center justify-center"
            style={{ width: `${awayPercent}%` }}
          >
            {awayPercent > 10 && <span>{awayPercent}%</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          {teams?.home?.name || "Home"} vs {teams?.away?.name || "Away"}
        </h2>
        <p className="text-gray-400">
          {fx?.date ? new Date(fx.date).toLocaleString() : "N/A"} |{" "}
          {venue?.name || "N/A"} ({venue?.city || "N/A"}) | Ref:{" "}
          {referee || "N/A"}
        </p>
      </div>

      {/* Prediction Tip */}
      {prediction?.predictions && (
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-teal-400 mb-2">Tip</h3>
          <p className="text-white">{prediction.predictions.advice || "N/A"}</p>
        </div>
      )}

      {/* Standings */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Standings</h3>
        {standings ? (
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium">{teams?.home?.name || "Home"}</h4>
              <p>Rank: {standings.home?.rank ?? "-"}</p>
              <p>Points: {standings.home?.points ?? "-"}</p>
              <p>Played: {standings.home?.all?.played ?? "-"}</p>
            </div>
            <div>
              <h4 className="font-medium">{teams?.away?.name || "Away"}</h4>
              <p>Rank: {standings.away?.rank ?? "-"}</p>
              <p>Points: {standings.away?.points ?? "-"}</p>
              <p>Played: {standings.away?.all?.played ?? "-"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No data available</p>
        )}
      </div>

      {/* Last 5 Matches */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Last 5 Matches</h3>
        {last5 ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">{teams?.home?.name}</h4>
              {last5.home?.length > 0 ? (
                <ul className="space-y-1 text-gray-300 text-sm">
                  {last5.home.map((m, i) => (
                    <li key={i}>
                      {m.teams?.home?.name} {m.score?.fulltime?.home ?? "-"} -{" "}
                      {m.score?.fulltime?.away ?? "-"} {m.teams?.away?.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">{teams?.away?.name}</h4>
              {last5.away?.length > 0 ? (
                <ul className="space-y-1 text-gray-300 text-sm">
                  {last5.away.map((m, i) => (
                    <li key={i}>
                      {m.teams?.home?.name} {m.score?.fulltime?.home ?? "-"} -{" "}
                      {m.score?.fulltime?.away ?? "-"} {m.teams?.away?.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No data available</p>
        )}
      </div>

      {/* Head to Head */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Head to Head</h3>
        {h2h?.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-300">
            {h2h.map((match, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {match.teams?.home?.name} {match.score?.fulltime?.home ?? "-"} -{" "}
                  {match.score?.fulltime?.away ?? "-"} {match.teams?.away?.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {match.fixture?.date
                    ? new Date(match.fixture.date).toLocaleDateString()
                    : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No data available</p>
        )}
      </div>

      {/* Comparison */}
      {prediction?.comparison && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-white">Team Form Comparison</h3>
          {Object.entries(prediction.comparison).map(([key, val]) =>
            renderComparisonBar(key, val.home, val.away)
          )}
        </div>
      )}
    </div>
  );
};

export default FixtureDetail;
