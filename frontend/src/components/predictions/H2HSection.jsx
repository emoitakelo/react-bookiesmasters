const H2HSection = ({ h2h }) => {
  if (!h2h || h2h.length === 0)
    return <p className="text-center text-gray-400 mb-6">No H2H data available</p>;

  return (
    <div className="mb-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Head to Head</h3>
      <div className="flex flex-col gap-2">
        {h2h.slice(0, 5).map((match) => (
          <div
            key={match.fixture.id}
            className="grid grid-cols-3 items-center bg-gray-100 p-2 rounded"
          >
            {/* Home Team */}
            <span className="text-sm font-medium truncate text-left">
              {match.teams.home.name}
            </span>

            {/* Score */}
            <span className="text-sm text-gray-600 text-center">
              {match.goals.home} - {match.goals.away}
            </span>

            {/* Away Team */}
            <span className="text-sm font-medium truncate text-right">
              {match.teams.away.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default H2HSection;
