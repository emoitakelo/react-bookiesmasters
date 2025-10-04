import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import LeagueHeader from "../components/fixtures/LeagueHeader";
import PredictionTip from "../components/fixtures/PredictionTip";
import TeamsScore from "../components/fixtures/TeamScore";
import VenueInfo from "../components/fixtures/VenueInfo";
import H2HSection from "../components/fixtures/H2HSection";
import RecentMatches from "../components/fixtures/RecentMatches";
import ComparisonBars from "../components/fixtures/ComparisonBars";

const FixtureDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-4 min-h-screen text-white bg-black">
      <Link to="/fixtures" className="text-gray-400 underline mb-4 inline-block">
        ← Back to fixtures
      </Link>

      <LeagueHeader league={details.league} />
      <PredictionTip prediction={details.prediction ?? details.predictions} teams={details.teams} />
      <TeamsScore teams={details.teams} score={details.score} fixture={details.fixture} prediction={details.prediction} />
      <VenueInfo venue={details.venue} referee={details.fixture?.referee} />

      <H2HSection h2h={details.h2h} />
      <RecentMatches matches={details.recent?.home} title={`Recent Matches - ${details.teams?.home?.name}`} />
      <RecentMatches matches={details.recent?.away} title={`Recent Matches - ${details.teams?.away?.name}`} />
      <ComparisonBars comparison={details.comparison} />
    </div>
  );
};

export default FixtureDetails;
