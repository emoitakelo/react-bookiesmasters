import React from "react";

const TeamDisplay = ({ home, away, displayDate, venue }) => {
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

  // ✅ Show score or "-"
  const scoreDisplay =
    home.score !== null && away.score !== null
      ? `${home.score} - ${away.score}`
      : "-";

  return (
    <div className="flex flex-col items-center mb-6">
      {/* Teams */}
      <div className="text-center text-lg font-semibold mb-3">
        {home.name} vs {away.name}
      </div>

      {/* Layout: Home | Date/Score | Away */}
      <div className="grid grid-cols-3 items-center gap-4 max-w-2xl w-full">
        {/* Home */}
        <div className="flex flex-col items-center">
          <img
            src={home.logo}
            alt={home.name}
            className="w-16 h-16 object-contain"
          />
          {home.last5Matches && renderFormBars(home.last5Matches)}
        </div>

        {/* DisplayDate / Score */}
        <div className="text-center text-gray-600 text-sm">
          <div>{displayDate}</div>
          <div className="text-lg font-bold mt-1">{scoreDisplay}</div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center">
          <img
            src={away.logo}
            alt={away.name}
            className="w-16 h-16 object-contain"
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
