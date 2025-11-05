"use client";

import React from "react";
import LeagueGroup from "./LeagueGroup";
import PredictionCard from "./PredictionCard";
import { LeagueData, Fixture } from "../../types";

interface PredictionListProps {
  predictions: LeagueData[];
  isLoading?: boolean;
}

const PredictionList: React.FC<PredictionListProps> = ({
  predictions,
  isLoading = false,
}) => {
  if (isLoading) return null;

  if (!predictions || predictions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No predictions available for this date.
      </p>
    );
  }

  return (
    <div className="space-y-3">
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
