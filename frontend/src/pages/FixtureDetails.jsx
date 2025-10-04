import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const FixtureDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/fixtures/${id}/details`);
        setDetails(res.data);
      } catch (err) {
        console.error("Error fetching fixture details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!details) return <p className="text-white text-center mt-10">Loading...</p>;

  const { fixture, league, teams, score, prediction, venue, h2h, form } = details;
  const matchDate = new Date(fixture.date);
  const dateStr = matchDate.toLocaleDateString();
  const timeStr = matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Determine favorite team
  const favorite = prediction?.favorite;

  return (
    <div className="p-4 min-h-screen text-white bg-black">
      <Link to="/fixtures" className="text-gray-400 underline mb-4 inline-block">← Back to fixtures</Link>

      {/* League */}
      <div className="flex items-center gap-2 mb-4">
        <img src={league.logo} alt={league.name} className="w-6 h-6" />
        <h2 className="font-bold text-lg">{league.name}</h2>
      </div>

      {/* Prediction Tip */}
      {prediction && (
        <div className="mb-2 text-center p-2 bg-gray-800 rounded font-semibold text-yellow-400">
          {prediction.tip}
        </div>
      )}

      {/* Teams & Score */}
      <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-2">
        <div className={`flex-1 flex flex-col items-center ${favorite === "home" ? "bg-gray-800 rounded-lg p-2" : ""}`}>
          <img src={teams.home.logo} alt={teams.home.name} className="w-12 h-12 mb-1" />
          <span className="font-semibold">{teams.home.name}</span>
        </div>

        <div className="text-center font-bold">
          {score.fulltime.home ?? "-"} - {score.fulltime.away ?? "-"}
          <div className="text-gray-400 text-sm">{timeStr} {dateStr}</div>
        </div>

        <div className={`flex-1 flex flex-col items-center ${favorite === "away" ? "bg-gray-800 rounded-lg p-2" : ""}`}>
          <img src={teams.away.logo} alt={teams.away.name} className="w-12 h-12 mb-1" />
          <span className="font-semibold">{teams.away.name}</span>
        </div>
      </div>

      {/* Venue */}
      <div className="mb-4 text-gray-400 text-center">Venue: {venue.name}</div>

      {/* Head-to-Head */}
      {h2h.length > 0 && (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold mb-2">Head-to-Head</h3>
          <div className="flex flex-col gap-2">
            {h2h.map((match, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
                <span className="w-20">{new Date(match.fixture.date).toLocaleDateString()}</span>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-5 h-5" />
                    <span>{match.teams.home.name}</span>
                  </div>
                  <span className="font-semibold">
                    {match.score.fulltime.home ?? "-"} - {match.score.fulltime.away ?? "-"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span>{match.teams.away.name}</span>
                    <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Form */}
      {form.home && form.away && (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold mb-2">Team Form</h3>
          <div className="flex items-center gap-4">
            {/* Home form */}
            <div className="flex-1">
              <h4 className="text-sm mb-1">{teams.home.name}</h4>
              <div className="flex gap-1">
                {form.home.map((res, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-3 rounded ${res === "W" ? "bg-green-500" : res === "D" ? "bg-yellow-400" : "bg-red-500"}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Away form */}
            <div className="flex-1">
              <h4 className="text-sm mb-1">{teams.away.name}</h4>
              <div className="flex gap-1">
                {form.away.map((res, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-3 rounded ${res === "W" ? "bg-green-500" : res === "D" ? "bg-yellow-400" : "bg-red-500"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixtureDetails;
