// const MatchCard = ({ match }) => {
//   const dateStr = match.fixture?.date ? new Date(match.fixture.date).toLocaleDateString() : "TBA";
//   return (
//     <div className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded">
//       <span className="w-20">{dateStr}</span>
//       <div className="flex-1 flex justify-between items-center">
//         <div className="flex items-center gap-1">
//           {match.teams?.home?.logo && <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-5 h-5" />}
//           <span>{match.teams?.home?.name ?? "Home"}</span>
//         </div>
//         <span className="font-semibold">
//           {match.goals?.home ?? match.score?.fulltime?.home ?? "-"} - {match.goals?.away ?? match.score?.fulltime?.away ?? "-"}
//         </span>
//         <div className="flex items-center gap-1">
//           <span>{match.teams?.away?.name ?? "Away"}</span>
//           {match.teams?.away?.logo && <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-5 h-5" />}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MatchCard;


const MatchCard = ({ match }) => {
  const dateStr = match.fixture?.date
    ? new Date(match.fixture.date).toLocaleDateString()
    : "TBA";

  // ✅ Correctly targeting the form path
  const homeForm = match.teams?.home?.league?.form ?? "";
  const awayForm = match.teams?.away?.league?.form ?? "";

  return (
    <div className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded-lg shadow-sm border border-gray-800 hover:bg-gray-800 transition">
      {/* Date */}
      <span className="w-20 text-gray-400">{dateStr}</span>

      {/* Teams and Score */}
      <div className="flex-1 flex justify-between items-center">
        {/* Home */}
        <div className="flex flex-col items-center w-1/3">
          <span className="text-center text-sm font-medium truncate w-full">
            {match.teams?.home?.name ?? "Home"}
          </span>

          {match.teams?.home?.logo && (
            <img
              src={match.teams.home.logo}
              alt={match.teams.home.name}
              className="w-6 h-6 object-contain mb-1"
            />
          )}

          {/* ✅ Home Form below logo */}
          {homeForm && (
            <div className="flex gap-0.5 mt-0.5">
              {homeForm.split("").map((res, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold px-[4px] rounded ${
                    res === "W"
                      ? "bg-green-500 text-black"
                      : res === "D"
                      ? "bg-orange-200 text-black"
                      : "bg-red-500 text-black"
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <span className="font-semibold text-white">
            {match.goals?.home ?? match.score?.fulltime?.home ?? "-"} -{" "}
            {match.goals?.away ?? match.score?.fulltime?.away ?? "-"}
          </span>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center w-1/3">
          <span className="text-center text-sm font-medium truncate w-full">
            {match.teams?.away?.name ?? "Away"}
          </span>

          {match.teams?.away?.logo && (
            <img
              src={match.teams.away.logo}
              alt={match.teams.away.name}
              className="w-6 h-6 object-contain mb-1"
            />
          )}

          {/* ✅ Away Form below logo */}
          {awayForm && (
            <div className="flex gap-0.5 mt-0.5">
              {awayForm.split("").map((res, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold px-[4px] rounded ${
                    res === "W"
                      ? "bg-green-500 text-black"
                      : res === "D"
                      ? "bg-orange-200 text-black"
                      : "bg-red-500 text-black"
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
