// // src/components/predictions/LeagueGroup.jsx
// import React from "react";

// const LeagueGroup = ({ league, leagueLogo, children }) => {
//   return (
//     <section className="mb-8">
//       {/* League header */}
//       <div className="flex items-center gap-3 mb-3 border-b border-teal-500 pb-1">
//         <img src={leagueLogo} alt={league} className="w-6 h-6 sm:w-8 sm:h-8" />
//         <h2 className="text-base sm:text-lg font-semibold text-gray-800">
//           {league}
//         </h2>
//       </div>

//       {/* Fixtures under this league */}
//       <div className="space-y-3">{children}</div>
//     </section>
//   );
// };

// export default LeagueGroup;


// src/components/predictions/LeagueGroup.jsx
import React from "react";

const LeagueGroup = ({ league, leagueLogo, children }) => {
  return (
    <section className="mb-10">
      {/* 🏆 League Header */}
      <div className="max-w-3xl mx-auto flex items-center gap-3 mb-4 border-b border-teal-500 pb-2 px-2">
        <img
          src={leagueLogo}
          alt={league}
          className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
        />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {league}
        </h2>
      </div>

      {/* ⚽ Fixtures under this league */}
      <div className="max-w-3xl mx-auto space-y-3 px-2">{children}</div>
    </section>
  );
};

export default LeagueGroup;
