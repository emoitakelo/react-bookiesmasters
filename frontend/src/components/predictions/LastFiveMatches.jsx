const LastFiveMatches = ({ teamName, matches }) => {
  if (!matches || matches.length === 0) return null;

  const getScoreBadgeColor = (ourScore, opponentScore) => {
    const our = Number(ourScore);
    const opp = Number(opponentScore);

    if (our === opp) return "bg-orange-200 text-orange-800"; // draw
    if (our > opp) return "bg-green-200 text-green-800";    // win
    return "bg-red-200 text-red-800";                       // loss
  };

  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <h4 className="text-md font-semibold text-gray-800 mb-2">{teamName} — Last 5 Matches</h4>
      <div className="flex flex-col gap-2">
        {matches.map((m, i) => {
          const isHome = m.homeTeam.name === teamName;
          const ourScore = isHome ? m.score.home : m.score.away;
          const opponentScore = isHome ? m.score.away : m.score.home;

          const matchDate = new Date(m.date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          });

          return (
            <div
              key={i}
              className="grid grid-cols-4 items-center bg-gray-50 border p-2 rounded text-sm"
            >
              {/* 1️⃣ Date */}
              <div className="truncate text-gray-500">{matchDate}</div>

              {/* 2️⃣ Home Team */}
              <div className="truncate font-medium">{m.homeTeam.name}</div>

              {/* 3️⃣ Score */}
              <div className="flex justify-center">
                <span
                  className={`w-16 text-center px-2 py-1 rounded font-semibold ${getScoreBadgeColor(
                    ourScore,
                    opponentScore
                  )}`}
                >
                  {m.score.home} - {m.score.away}
                </span>
              </div>

              {/* 4️⃣ Away Team */}
              <div className="truncate font-medium text-right">{m.awayTeam.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LastFiveMatches;
