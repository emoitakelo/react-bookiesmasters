const LastFiveMatches = ({ teamName, matches }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="mb-8 max-w-md mx-auto">
      <h4 className="text-md font-semibold text-gray-800 mb-2">{teamName} — Last 5 Matches</h4>
      <div className="flex flex-col gap-2">
        {matches.map((m, i) => (
          <div
            key={i}
            className="grid grid-cols-3 items-center bg-gray-50 border p-2 rounded text-sm"
          >
            {/* Home Team */}
            <span className="flex items-center gap-1 truncate text-left">
              <img src={m.homeTeam.logo} alt={m.homeTeam.name} className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{m.homeTeam.name}</span>
            </span>

            {/* Score */}
            <span className="text-gray-700 font-medium text-center">
              {m.score.home} - {m.score.away}
            </span>

            {/* Away Team */}
            <span className="flex items-center gap-1 justify-end truncate text-right">
              <span className="truncate">{m.awayTeam.name}</span>
              <img src={m.awayTeam.logo} alt={m.awayTeam.name} className="w-5 h-5 flex-shrink-0" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastFiveMatches;
