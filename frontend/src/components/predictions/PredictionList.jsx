// src/components/predictions/PredictionList.jsx
import React from "react";
import LeagueGroup from "./LeagueGroup";
import PredictionCard from "./PredictionCard";

const PredictionList = ({ predictions }) => {
  if (!predictions || predictions.length === 0)
    return <p className="text-center text-gray-500">No predictions available.</p>;

  return (
    <div className="space-y-10">
      {predictions.map((leagueData, index) => (
        <LeagueGroup
          key={index}
          league={leagueData.league}
          leagueLogo={leagueData.leagueLogo}
          country={leagueData.country} 
        >
          {leagueData.fixtures.map((fixture) => (
            <PredictionCard key={fixture.fixtureId} fixture={fixture} />
          ))}
        </LeagueGroup>
      ))}
    </div>
  );
};

export default PredictionList;
