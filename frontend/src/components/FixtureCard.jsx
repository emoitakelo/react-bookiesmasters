import { Link } from "react-router-dom";

const FixtureCard = ({ fixture }) => {
  // 🛑 Skip fixture if predictions or winner name is missing/null
  const prediction = fixture?.predictions?.predictions;
  const winnerName = prediction?.winner?.name ?? null;

  if (!prediction || !winnerName) return null;

  const teams = fixture.teams ?? {};
  const { home = {}, away = {} } = teams;
  const fx = fixture.fixture ?? {};
  const score = fixture.score ?? {};
  const { status, date, id } = fx;
  const { fulltime } = score;

  // --- Format time/status ---
  const matchDate = date ? new Date(date) : null;
  const time = matchDate
    ? matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBA";

  let displayStatus = time;
  if (status?.short === "FT") displayStatus = "FT";
  else if (status?.short === "HT") displayStatus = "HT";
  else if (status?.short === "NS") displayStatus = time;
  else if (status?.short === "1H" || status?.short === "2H")
    displayStatus = `${status.elapsed}'`;

  // --- Tip logic ---
  const getTip = (prediction, teams) => {
    const { win_or_draw, winner } = prediction;
    const winnerName = winner?.name;
    const { home, away } = teams;

    if (!winnerName) return "-";

    if (win_or_draw === false && winnerName === home.name) return "1";
    if (win_or_draw === false && winnerName === away.name) return "2";
    if (win_or_draw === true && winnerName === home.name) return "1X";
    if (win_or_draw === true && winnerName === away.name) return "X2";
    return "-";
  };

  const tip = getTip(prediction, { home, away });

  // --- UI ---
  return (
    <Link to={`/fixtures/${id}`} className="block">
      <div className="bg-gray-900 rounded-lg p-3 mb-2 hover:bg-gray-800 transition shadow-sm border border-gray-800">
        {/* Tip */}
        <div className="text-center mb-3">
          <span className="bg-teal-500 text-black font-bold px-3 py-1 rounded-md text-sm">
            {tip}
          </span>
        </div>

        {/* Teams Row */}
        <div className="flex justify-between items-center text-gray-100">
          {/* Home */}
          <div className="flex flex-col items-center w-1/3">
            {home.logo && (
              <img
                src={home.logo}
                alt={home.name}
                className="w-8 h-8 object-contain mb-1"
              />
            )}
            <span className="text-center text-sm font-medium">
              {home.name ?? "Home"}
            </span>
          </div>

          {/* Score / Status */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-gray-400 text-xs">{displayStatus}</span>
            <span className="font-semibold text-lg text-white">
              {status?.short === "FT" ||
              status?.short === "1H" ||
              status?.short === "2H"
                ? `${fulltime?.home ?? "-"} - ${fulltime?.away ?? "-"}`
                : "-"}
            </span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center w-1/3">
            {away.logo && (
              <img
                src={away.logo}
                alt={away.name}
                className="w-8 h-8 object-contain mb-1"
              />
            )}
            <span className="text-center text-sm font-medium">
              {away.name ?? "Away"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
