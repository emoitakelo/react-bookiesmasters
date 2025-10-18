const LastFiveMatches = ({ teamName, matches }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="mb-8">
      <h4 className="text-md font-semibold text-gray-800 mb-2">{teamName} — Last 5 Matches</h4>
      <div className="flex flex-col gap-2">
        {matches.map((m, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-50 border p-2 rounded text-sm"
          >
            <span className="flex items-center gap-2">
              <img src={m.homeTeam.logo} alt={m.homeTeam.name} className="w-5 h-5" />
              {m.homeTeam.name}
            </span>
            <span className="text-gray-700 font-medium">
              {m.score.home} - {m.score.away}
            </span>
            <span className="flex items-center gap-2">
              {m.awayTeam.name}
              <img src={m.awayTeam.logo} alt={m.awayTeam.name} className="w-5 h-5" />
            </span>
            <span
              className="ml-2 px-2 py-1 rounded text-white text-xs"
              style={{ backgroundColor: m.color }}
            >
              {m.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastFiveMatches;
