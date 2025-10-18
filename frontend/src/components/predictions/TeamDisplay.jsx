import React from "react";

const TeamDisplay = ({ fixture }) => {
  if (!fixture) return null;

  const {
    homeTeam,
    awayTeam,
    date,
    displayDate,
    status,
    venue,
  } = fixture;

  // 🕒 Format time/date display
  const matchDateTime =
    status === "FT" || status === "FT_PEN" || status === "AET"
      ? displayDate || "FT"
      : new Date(date).toLocaleString("en-GB", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        });

  // ✅ Get numeric scores correctly
  const homeScore =
    typeof homeTeam?.score === "number" ? homeTeam.score : null;
  const awayScore =
    typeof awayTeam?.score === "number" ? awayTeam.score : null;

  // ✅ Display "X - Y" if scores exist, otherwise show "vs"
  const scoreDisplay =
    homeScore !== null && awayScore !== null
      ? `${homeScore} - ${awayScore}`
      : "vs";

  // 🟩 Render team form (if available)
  const renderFormBars = (forms) => {
    if (!forms || !Array.isArray(forms) || forms.length === 0) return null;

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
    <div className="flex flex-col items-center mb-8 text-gray-800">
      {/* 🏟️ Team names */}
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
        {homeTeam?.name} vs {awayTeam?.name}
      </h2>

      {/* 🖼️ Logos + Score or Time */}
      <div className="grid grid-cols-3 items-center gap-6 max-w-2xl w-full">
        {/* Home team */}
        <div className="flex flex-col items-center">
          <img
            src={homeTeam?.logo}
            alt={homeTeam?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          {renderFormBars(homeTeam?.last5Matches)}
        </div>

        {/* Center section (time + score) */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-sm sm:text-base text-gray-600">{matchDateTime}</div>
          <div
            className={`text-lg sm:text-xl font-bold mt-1 ${
              status === "FT" ? "text-gray-900" : "text-gray-700"
            }`}
          >
            {scoreDisplay}
          </div>
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center">
          <img
            src={awayTeam?.logo}
            alt={awayTeam?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          {renderFormBars(awayTeam?.last5Matches)}
        </div>
      </div>

      {/* 🏟️ Venue (optional) */}
      {venue && (
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Venue: {venue}
        </p>
      )}
    </div>
  );
};

export default TeamDisplay;
