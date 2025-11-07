import React from "react";
import FormBadge from "./FormBadge"; // ✅ not PredictionList

// 🧩 Define the shape of a team
interface Team {
  name: string;
  logo: string;
}

// 🧩 Props interface
interface TeamInfoProps {
  team: Team;
  form?: string; // optional string representing last match results
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team, form }) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <img
          src={team.logo}
          alt={team.name}
          className="w-5 h-5 md:w-6 md:h-6"
        />
        <span>{team.name}</span>
      </div>
      <div className="flex gap-1">
        {form?.split("").map((char, i) => (
          <FormBadge key={i} result={char} />
        ))}
      </div>
    </div>
  );
};

export default TeamInfo;
