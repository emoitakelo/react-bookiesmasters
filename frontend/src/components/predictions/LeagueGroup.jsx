import React from "react";

const LeagueGroup = ({ league, leagueLogo, country, children }) => {
  return (
    <section className="mb-10">
      {/* 🏆 League Header */}
      <div className="max-w-xl mx-auto mb-2 border-b border-teal-500 pb-1 px-2">
        <div className="flex items-center gap-3">
          <img
            src={leagueLogo}
            alt={league}
            className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
          />
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
              {league}
            </h2>

            {/* 🌍 Country name (no logo) */}
            {country && (
              <p className="text-xs text-gray-500 leading-tight">{country}</p>
            )}
          </div>
        </div>
      </div>

      {/* ⚽ Fixtures under this league */}
      <div className="max-w-xl mx-auto space-y-1 px-2">{children}</div>
    </section>
  );
};

export default LeagueGroup;
