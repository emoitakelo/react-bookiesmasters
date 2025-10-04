const MatchCard = ({ match }) => {
  const dateStr = match.fixture?.date ? new Date(match.fixture.date).toLocaleDateString() : "TBA";
  return (
    <div className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
      <span className="w-20">{dateStr}</span>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center gap-1">
          {match.teams?.home?.logo && <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-5 h-5" />}
          <span>{match.teams?.home?.name ?? "Home"}</span>
        </div>
        <span className="font-semibold">
          {match.goals?.home ?? match.score?.fulltime?.home ?? "-"} - {match.goals?.away ?? match.score?.fulltime?.away ?? "-"}
        </span>
        <div className="flex items-center gap-1">
          <span>{match.teams?.away?.name ?? "Away"}</span>
          {match.teams?.away?.logo && <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};
export default MatchCard;
