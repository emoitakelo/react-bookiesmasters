// // src/components/predictions/PredictionCard.jsx
// import React from "react";

// const PredictionCard = ({ fixture }) => {
//   const { date, displayDate, status, homeTeam, awayTeam, form, tip } = fixture;

//   const localTime = new Date(date).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   const localDate = new Date(date).toLocaleDateString();

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-4 items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 sm:p-4">
//       {/* 🕒 Date & Time */}
//       <div className="text-center sm:text-left text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
//         <p>{status === "FT" ? displayDate : localTime}</p>
//         <p className="text-gray-400">{localDate}</p>
//       </div>

//       {/* 🏟️ Teams */}
//       <div className="flex flex-col items-start gap-1 sm:gap-2">
//         <div className="flex items-center gap-2">
//           <img src={homeTeam.logo} alt={homeTeam.name} className="w-5 h-5 sm:w-6 sm:h-6" />
//           <span className="font-medium text-gray-800 text-sm sm:text-base">{homeTeam.name}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <img src={awayTeam.logo} alt={awayTeam.name} className="w-5 h-5 sm:w-6 sm:h-6" />
//           <span className="font-medium text-gray-800 text-sm sm:text-base">{awayTeam.name}</span>
//         </div>
//       </div>

//       {/* 📊 Forms & Tip */}
//       <div className="text-center sm:text-center">
//         {/* <p className="text-xs sm:text-sm text-gray-500">{form.home}</p> */}
//         <p className="text-sm sm:text-base font-bold text-teal-600 my-1">{tip}</p>
//         {/* <p className="text-xs sm:text-sm text-gray-500">{form.away}</p> */}
//       </div>

//       {/* ⚽ Score */}
//       <div className="text-center font-semibold text-gray-800 text-sm sm:text-base">
//         {homeTeam.score} - {awayTeam.score}
//       </div>
//     </div>
//   );
// };

// export default PredictionCard;


// src/components/predictions/PredictionCard.jsx
import React from "react";
import { Link } from "react-router-dom";


const PredictionCard = ({ fixture }) => {
  const { fixtureId,date, status, homeTeam, awayTeam, tip } = fixture;

  // 🕒 Format time (24-hour, no AM/PM)
  const localTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // 📅 Format date as MM/DD/YY
  const localDate = new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: false,
  });

  // 🎨 Tip color logic
  const getTipColor = (tip, homeScore, awayScore, status) => {
    // No score yet
    if (
      status !== "FT" &&
      (homeScore === null ||
        homeScore === undefined ||
        awayScore === null ||
        awayScore === undefined)
    ) {
      return "text-orange-400"; // pale orange for pending matches
    }

    // Convert to numbers just in case
    const home = Number(homeScore);
    const away = Number(awayScore);

    switch (tip) {
      case "1":
        return home > away ? "text-green-500" : "text-red-500";
      case "X":
        return home === away ? "text-green-500" : "text-red-500";
      case "2":
        return away > home ? "text-green-500" : "text-red-500";
      case "1X":
        return home >= away ? "text-green-500" : "text-red-500";
      case "X2":
        return away >= home ? "text-green-500" : "text-red-500";
      default:
        return "text-teal-600"; // fallback for unknown tips
    }
  };

  return (
     <Link to={`/predictions/${fixtureId}`} className="block">
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between flex-nowrap p-1 sm:p-2 overflow-hidden">
      {/* 🕒 Date & Time */}
      <div className="flex-shrink-0 text-center sm:text-left text-[6px] sm:text-xs text-gray-600 w-[55px] sm:w-[70px] leading-tight">
  <p className="text-gray-700 m-0 p-0">{status === "FT" ? "FT" : localTime}</p>
  <p className="text-gray-400 m-0 p-0">{localDate}</p>
</div>
      {/* 🏟️ Teams */}
      <div className="flex flex-col justify-center flex-grow px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <img
            src={homeTeam.logo}
            alt={homeTeam.name}
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[70px] sm:max-w-[130px]">
            {homeTeam.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={awayTeam.logo}
            alt={awayTeam.name}
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[70px] sm:max-w-[130px]">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* 📊 Tip */}
      <div className="flex-shrink-0 text-center px-1 sm:px-3">
        <p
          className={`text-sm sm:text-base font-semibold ${getTipColor(
            tip,
            homeTeam.score,
            awayTeam.score,
            status
          )}`}
        >
          {tip}
        </p>
      </div>

      {/* ⚽ Score (stacked vertically) */}
      <div className="flex-shrink-0 text-center font-semibold text-gray-800 text-sm sm:text-base flex flex-col justify-center items-center w-[40px] sm:w-[50px]">
        <span>{homeTeam.score}</span>
        <span>{awayTeam.score}</span>
      </div>
    </div>
    </Link>
  );
};

export default PredictionCard;
