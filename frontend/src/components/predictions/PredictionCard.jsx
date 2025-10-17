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

const PredictionCard = ({ fixture }) => {
  const { date, status, homeTeam, awayTeam, tip } = fixture;

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
    year: "2-digit",
  });

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition grid grid-cols-2 sm:grid-cols-4 items-center p-3 sm:p-4">
      {/* 🕒 Date & Time */}
      <div className="text-center sm:text-left text-[11px] sm:text-sm text-gray-600">
        <p className="font-medium text-gray-700">
          {status === "FT" ? "FT" : localTime}
        </p>
        <p className="text-gray-400">{localDate}</p>
      </div>

      {/* 🏟️ Teams */}
      <div className="flex flex-col items-start gap-1 sm:gap-2">
        <div className="flex items-center gap-2">
          <img
            src={homeTeam.logo}
            alt={homeTeam.name}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[100px] sm:max-w-[150px]">
            {homeTeam.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={awayTeam.logo}
            alt={awayTeam.name}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <span className="font-semibold text-gray-800 text-[13px] sm:text-base truncate max-w-[100px] sm:max-w-[150px]">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* 📊 Tip */}
      <div className="text-center">
        <p className="text-sm sm:text-base font-bold text-teal-600 my-1">
          {tip}
        </p>
      </div>

      {/* ⚽ Score (stacked vertically) */}
      <div className="text-center font-semibold text-gray-800 text-sm sm:text-base flex flex-col justify-center items-center">
        <span>{homeTeam.score}</span>
        <span>-</span>
        <span>{awayTeam.score}</span>
      </div>
    </div>
  );
};

export default PredictionCard;
