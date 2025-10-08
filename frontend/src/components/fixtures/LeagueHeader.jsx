const LeagueHeader = ({ league }) => {
  if (!league) return null;

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* League logo */}
      {league.logo && (
        <img
          src={league.logo}
          alt={league.name}
          className="w-6 h-6 object-contain"
        />
      )}

      {/* League name and country */}
      <div className="flex flex-col justify-center leading-tight">
        <h2 className="font-bold text-white text-base tracking-tight">
          {league.name || "Unknown League"}
        </h2>

        {league.country && (
          <span className="text-[12px] text-gray-500 italic mt-[2px] ml-[1px]">
            {league.country}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeagueHeader;
