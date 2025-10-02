// src/pages/FixtureDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="max-w-4xl mx-auto px-4 py-6 animate-pulse">
    {/* Header */}
    <div className="text-center mb-6">
      <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
    </div>

    {/* Standings */}
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="h-5 bg-gray-700 rounded w-1/4 mb-3"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    {/* Last 5 Matches */}
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="h-5 bg-gray-700 rounded w-1/4 mb-3"></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/5"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/5"></div>
        </div>
      </div>
    </div>

    {/* Head to Head */}
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="h-5 bg-gray-700 rounded w-1/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

const FixtureDetail = () => {
  const { id } = useParams();
  const [fixtureData, setFixtureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        const res = await axiosInstance.get(`/fixtures/${id}`);
        setFixtureData(res.data); // backend should return { fixture, h2h, last5, standings }
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {teams?.home?.name || "Home"} vs {teams?.away?.name || "Away"}
        </h2>
        <p className="text-gray-500">
          {fx?.date ? new Date(fx.date).toLocaleString() : "N/A"} | {venue?.name || "N/A"} (
          {venue?.city || "N/A"}) | Ref: {referee || "N/A"}
        </p>
      </div>

      {/* Standings */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Standings</h3>
        {standings ? (
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium">{teams?.home?.name || "Home"}</h4>
              <p>Rank: {standings.home?.rank ?? "No data available"}</p>
              <p>Points: {standings.home?.points ?? "No data available"}</p>
              <p>Played: {standings.home?.all?.played ?? "No data available"}</p>
            </div>
            <div>
              <h4 className="font-medium">{teams?.away?.name || "Away"}</h4>
              <p>Rank: {standings.away?.rank ?? "No data available"}</p>
              <p>Points: {standings.away?.points ?? "No data available"}</p>
              <p>Played: {standings.away?.all?.played ?? "No data available"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No data available</p>
        )}
      </div>

      {/* Last 5 Matches */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Last 5 Matches</h3>
        {last5 ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">{teams?.home?.name || "Home"}</h4>
              {last5.home?.length > 0 ? (
                <ul className="space-y-1 text-gray-300 text-sm">
                  {last5.home.map((m, i) => (
                    <li key={i}>
                      {m.teams?.home?.name || "Home"} {m.score?.fulltime?.home ?? "-"} -{" "}
                      {m.score?.fulltime?.away ?? "-"} {m.teams?.away?.name || "Away"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">{teams?.away?.name || "Away"}</h4>
              {last5.away?.length > 0 ? (
                <ul className="space-y-1 text-gray-300 text-sm">
                  {last5.away.map((m, i) => (
                    <li key={i}>
                      {m.teams?.home?.name || "Home"} {m.score?.fulltime?.home ?? "-"} -{" "}
                      {m.score?.fulltime?.away ?? "-"} {m.teams?.away?.name || "Away"}
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
                  {match.teams?.home?.name || "Home"} {match.score?.fulltime?.home ?? "-"} -{" "}
                  {match.score?.fulltime?.away ?? "-"} {match.teams?.away?.name || "Away"}
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
    </div>
  );
};

export default FixtureDetail;
