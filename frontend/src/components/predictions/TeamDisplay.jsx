import React from "react";

const TeamDisplay = ({ home, away, displayDate, status, venue, homeScore, awayScore }) => {
  const renderFormBars = (forms) => {
    // forms should be an array of objects: { result: "W", color: "#0f0" }
    return (
      <div className="flex justify-center gap-1 mt-1">
        {forms.map((m, idx) => (
          <span
            key={idx}
            className="px-1 py-1 rounded text-white text-xs"
            style={{ backgroundColor: m.color }}
          >
            {m.result}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {/* Team names */}
      <div className="text-center text-lg font-semibold mb-3">
        {home.name} vs {away.name}
      </div>

      {/* 3-column layout: Home | Date/Status | Away */}
      <div className="grid grid-cols-3 items-center gap-4 max-w-2xl w-full">
        {/* Home */}
        <div className="flex flex-col items-center">
          <img
            src={home.logo}
            alt={home.name}
            className="w-17 h-17 object-contain"
          />
          {home.last5Matches && renderFormBars(home.last5Matches)}
        </div>

        {/* Date / Status / Score */}
        <div className="text-center text-gray-600 text-sm">
          <div>{displayDate}</div>
          {status === "FT" && (
            <div className="text-lg font-bold mt-1">
              {homeScore} - {awayScore}
            </div>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center">
          <img
            src={away.logo}
            alt={away.name}
            className="w-17 h-17 object-contain"
          />
          {away.last5Matches && renderFormBars(away.last5Matches)}
        </div>
      </div>

      {/* Venue */}
      {venue && (
        <div className="text-center text-gray-600 text-sm mt-3">
          Venue: {venue}
        </div>
      )}
    </div>
  );
};

export default TeamDisplay;
