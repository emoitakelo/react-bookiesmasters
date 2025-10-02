import { Link } from "react-router-dom";

const FixtureCard = ({ fixture }) => {
  const { home, away } = fixture.teams;
  const { status, date } = fixture.fixture;
  const { fulltime } = fixture.score;

  const matchDate = new Date(date);
  const time = matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let displayStatus = time;
  if (status.short === "FT") displayStatus = "FT";
  else if (status.short === "HT") displayStatus = "HT";
  else if (status.short === "NS") displayStatus = time;
  else if (status.short === "1H" || status.short === "2H") displayStatus = `${status.elapsed}'`;

  return (
    <Link to={`/fixtures/${fixture.fixture.id}`} className="block">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-2 mb-2 rounded-lg hover:bg-gray-800 transition">
        {/* Time / Status */}
        <div className="text-gray-400 w-12 text-center">{displayStatus}</div>

        {/* Home */}
        <div className="flex items-center gap-2 flex-1 justify-end pr-2">
          <img src={home.logo} alt={home.name} className="w-5 h-5" />
          <span>{home.name}</span>
        </div>

        {/* Score */}
        <div className="text-center w-14 font-semibold">
          {status.short === "FT" || status.short === "1H" || status.short === "2H"
            ? `${fulltime.home ?? "-"} - ${fulltime.away ?? "-"}`
            : "-"}
        </div>

        {/* Away */}
        <div className="flex items-center gap-2 flex-1 pl-2">
          <span>{away.name}</span>
          <img src={away.logo} alt={away.name} className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
