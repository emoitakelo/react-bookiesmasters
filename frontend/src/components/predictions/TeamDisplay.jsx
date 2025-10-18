import React from "react";

const TeamDisplay = ({ fixture }) => {
  if (!fixture) return null;

  const { homeTeam, awayTeam, displayDate, venue } = fixture;

  // ✅ Determine score display correctly
  const scoreDisplay =
    homeTeam?.score !== null && awayTeam?.score !== null
      ? `${homeTeam.score} - ${awayTeam.score}`
      : "-";

  // ✅ Render form bars safely
  const renderFormBars = (forms) => {
    if (!forms || forms.length === 0) return null;
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
      {/* Match Title */}
      <div className="text-center text-lg font-semibold mb-3">
        {homeTeam?.name} vs {awayTeam?.name}
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-3 items-center gap-4 max-w-2xl w-full">
        {/* Home */}
        <div className="flex flex-col items-center">
          <img
            src={homeTeam?.logo}
            alt={homeTeam?.name}
            className="w-16 h-16 object-contain"
          />
          {homeTeam?.last5Matches && renderFormBars(homeTeam.last5Matches)}
        </div>

        {/* DisplayDate / Score */}
        <div className="text-center text-gray-600 text-sm">
          <div>{displayDate || "-"}</div>
          <div className="text-lg font-bold mt-1">{scoreDisplay}</div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center">
          <img
            src={awayTeam?.logo}
            alt={awayTeam?.name}
            className="w-16 h-16 object-contain"
          />
          {awayTeam?.last5Matches && renderFormBars(awayTeam.last5Matches)}
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
