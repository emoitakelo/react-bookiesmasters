const LeagueHeader = ({ league }) => {
  if (!league) return null;

  return (
    <div className="flex items-start gap-2 mb-4">
      {/* League logo */}
      {league.logo && (
        <img
          src={league.logo}
          alt={league.name}
          className="w-7 h-7 object-contain"
        />
      )}

      {/* League info */}
      <div className="flex flex-col items-start justify-center leading-snug">
        <h2 className="font-bold text-base text-white m-0 p-0">
          {league.name || "Unknown League"}
        </h2>

        {/* {league.country && 
          <span className="text-sm text-gray-400 mt-[2px] block">
            {league.country}
          </span>
        } */}
      </div>
    </div>
  );
};

export default LeagueHeader;
