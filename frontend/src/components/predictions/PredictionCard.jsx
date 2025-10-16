// src/components/predictions/PredictionCard.jsx
import React from "react";

const PredictionCard = ({ fixture }) => {
  const { date, displayDate, status, homeTeam, awayTeam, form, tip } = fixture;

  const localTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const localDate = new Date(date).toLocaleDateString();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 sm:p-4">
      {/* 🕒 Date & Time */}
      <div className="text-center sm:text-left text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
        <p>{status === "FT" ? displayDate : localTime}</p>
        <p className="text-gray-400">{localDate}</p>
      </div>

      {/* 🏟️ Teams */}
      <div className="flex flex-col items-start gap-1 sm:gap-2">
        <div className="flex items-center gap-2">
          <img src={homeTeam.logo} alt={homeTeam.name} className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium text-gray-800 text-sm sm:text-base">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={awayTeam.logo} alt={awayTeam.name} className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium text-gray-800 text-sm sm:text-base">{awayTeam.name}</span>
        </div>
      </div>

      {/* 📊 Forms & Tip */}
      {/* <div className="text-center sm:text-center">
        <p className="text-xs sm:text-sm text-gray-500">{form.home}</p>
        <p className="text-sm sm:text-base font-bold text-teal-600 my-1">{tip}</p>
        <p className="text-xs sm:text-sm text-gray-500">{form.away}</p>
      </div> */}

      {/* ⚽ Score */}
      <div className="text-center font-semibold text-gray-800 text-sm sm:text-base">
        {homeTeam.score} - {awayTeam.score}
      </div>
    </div>
  );
};

export default PredictionCard;
