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

  // 🕒 Show "FT" or local time/date
  const matchDateTime =
    status === "FT"
      ? displayDate
      : new Date(date).toLocaleString("en-GB", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        });

  // ✅ Fix: normalize scores (convert to numbers if needed)
  const homeScore =
    homeTeam?.score !== null && homeTeam?.score !== undefined
      ? Number(homeTeam.score)
      : null;

  const awayScore =
    awayTeam?.score !== null && awayTeam?.score !== undefined
      ? Number(awayTeam.score)
      : null;

  // ✅ Display score if both are numbers, otherwise "-"
  const scoreDisplay =
    !isNaN(homeScore) && !isNaN(awayScore)
      ? `${homeScore} - ${awayScore}`
      : "-";

  // 🟩 Render form badges
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

      {/* 🖼️ Logos + score/time */}
      <div className="grid grid-cols-3 items-center gap-6 max-w-2xl w-full">
        {/* Home */}
        <div className="flex flex-col items-center">
          <img
            src={homeTeam?.logo}
            alt={homeTeam?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          {renderFormBars(homeTeam?.last5Matches)}
        </div>

        {/* Center */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-sm sm:text-base text-gray-600">
            {matchDateTime}
          </div>
          <div className="text-lg sm:text-xl font-bold mt-1">
            {scoreDisplay}
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center">
          <img
            src={awayTeam?.logo}
            alt={awayTeam?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          {renderFormBars(awayTeam?.last5Matches)}
        </div>
      </div>
    </div>
  );
};

export default TeamDisplay;
