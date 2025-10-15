// src/components/predictions/LeagueGroup.jsx
import React from "react";

const LeagueGroup = ({ league, leagueLogo, children }) => {
  return (
    <section className="mb-8">
      {/* League header */}
      <div className="flex items-center gap-3 mb-3 border-b border-teal-500 pb-1">
        <img src={leagueLogo} alt={league} className="w-6 h-6 sm:w-8 sm:h-8" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {league}
        </h2>
      </div>

      {/* Fixtures under this league */}
      <div className="space-y-3">{children}</div>
    </section>
  );
};

export default LeagueGroup;
