import React from "react";

const LeagueGroup = ({ league, leagueLogo, country, children }) => {
  return (
    <section >
      {/* 🏆 League Header */}
     <div className="max-w-2xl mx-auto mb-2 pb-1">
  <div className="px-4">
    <div className="flex items-center gap-2 border-b border-teal-500 pb-1">
      <img
        src={leagueLogo}
        alt={league}
        className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0"
      />
      <div>
        <h2 className="text-sm sm:text-medium font-semibold text-gray-800 truncate">
          {league}
        </h2>
        {country && (
          <p className="text-xs text-gray-500 leading-tight">{country}</p>
        )}
      </div>
    </div>
  </div>
</div>


      {/* ⚽ Fixtures under this league */}
<div className="max-w-2xl mx-auto space-y-2 px-4">{children}</div>
    </section>
  );
};

export default LeagueGroup;
