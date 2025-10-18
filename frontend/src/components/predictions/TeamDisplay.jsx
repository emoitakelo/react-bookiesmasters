import React from "react";

const TeamDisplay = ({ fixture }) => {
  if (!fixture) return null;

  const { date, displayDate, status, homeTeam, awayTeam } = fixture;

  // 🕒 Format time
  const localTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // 📅 Format date
  const localDate = new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  // ⚽ Score display logic
  const scoreDisplay =
    homeTeam?.score != null && awayTeam?.score != null
      ? `${homeTeam.score} - ${awayTeam.score}`
      : "-";

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between flex-nowrap p-3 sm:p-4 overflow-hidden">
      {/* 🕒 Date & Time */}
      <div className="flex-shrink-0 text-center sm:text-left text-[11px] sm:text-sm text-gray-600 w-[65px] sm:w-[80px]">
        <p className="font-medium text-gray-700">
          {status === "FT" ? displayDate : localTime}
        </p>
        <p className="text-gray-400">{localDate}</p>
      </div>

      {/* 🏟️ Teams (home + away stacked) */}
      <div className="flex flex-col justify-center flex-grow px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <img
            src={homeTeam?.logo}
            alt={homeTeam?.name}
            className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[90px] sm:max-w-[160px]">
            {homeTeam?.name || "Home"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={awayTeam?.logo}
            alt={awayTeam?.name}
            className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[90px] sm:max-w-[160px]">
            {awayTeam?.name || "Away"}
          </span>
        </div>
      </div>

      {/* ⚽ Score */}
      <div className="flex-shrink-0 text-center font-semibold text-gray-800 text-sm sm:text-base flex flex-col justify-center items-center w-[50px] sm:w-[60px]">
        <span>{scoreDisplay}</span>
      </div>
    </div>
  );
};

export default TeamDisplay;
