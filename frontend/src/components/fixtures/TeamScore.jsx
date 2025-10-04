const TeamsScore = ({ teams, score, fixture, prediction }) => {
  const winnerName = prediction?.winner?.name ?? null;
  const matchDate = fixture.date ? new Date(fixture.date) : null;
  const dateStr = matchDate ? matchDate.toLocaleDateString() : "TBA";
  const timeStr = matchDate ? matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-2">
      {/* Home */}
      <div className="flex-1 flex flex-col items-center">
        {teams.home?.logo && <img src={teams.home.logo} alt={teams.home?.name} className="w-12 h-12 mb-1" />}
        <span className="font-semibold">{teams.home?.name ?? "Home"}</span>
      </div>

      {/* Score */}
      <div className="text-center font-bold">
        {score.fulltime?.home ?? "-"} - {score.fulltime?.away ?? "-"}
        <div className="text-gray-400 text-sm">
          {timeStr} {dateStr}
        </div>
        {winnerName && <div className="text-gray-400 text-xs mt-1">Predicted: {winnerName}</div>}
      </div>

      {/* Away */}
      <div className="flex-1 flex flex-col items-center">
        {teams.away?.logo && <img src={teams.away.logo} alt={teams.away?.name} className="w-12 h-12 mb-1" />}
        <span className="font-semibold">{teams.away?.name ?? "Away"}</span>
      </div>
    </div>
  );
};
export default TeamsScore;
