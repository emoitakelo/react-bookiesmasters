import React from "react";

// 🧩 Define the LeagueInfo type (same as in PredictionDetails)
interface LeagueInfo {
  name: string;
  logo?: string;
  country?: string;
}

// 🧩 Props interface
interface LeagueHeaderProps {
  league: LeagueInfo;
}

const LeagueHeader: React.FC<LeagueHeaderProps> = ({ league }) => (
  <div className="text-center mb-6">
    <h2 className="text-xl font-semibold text-teal-600">{league.name}</h2>
  </div>
);

export default LeagueHeader;
