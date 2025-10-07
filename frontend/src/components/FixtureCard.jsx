// // import { Link } from "react-router-dom";

// // const FixtureCard = ({ fixture }) => {
// //   // 🛑 Skip fixture if predictions or winner name is missing/null
// //   const prediction = fixture?.predictions?.predictions;
// //   const winnerName = prediction?.winner?.name ?? null;

// //   if (!prediction || !winnerName) return null;

// //   const teams = fixture.teams ?? {};
// //   const { home = {}, away = {} } = teams;
// //   const fx = fixture.fixture ?? {};
// //   const score = fixture.score ?? {};
// //   const { status, date, id } = fx;
// //   const { fulltime } = score;

// //   // --- Format time/status ---
// //   const matchDate = date ? new Date(date) : null;
// //   const time = matchDate
// //     ? matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
// //     : "TBA";

// //   let displayStatus = time;
// //   if (status?.short === "FT") displayStatus = "FT";
// //   else if (status?.short === "HT") displayStatus = "HT";
// //   else if (status?.short === "NS") displayStatus = time;
// //   else if (status?.short === "1H" || status?.short === "2H")
// //     displayStatus = `${status.elapsed}'`;

// //   // --- Tip logic ---
// //   const getTip = (prediction, teams) => {
// //     const { win_or_draw, winner } = prediction;
// //     const winnerName = winner?.name;
// //     const { home, away } = teams;

// //     if (!winnerName) return "-";

// //     if (win_or_draw === false && winnerName === home.name) return "1";
// //     if (win_or_draw === false && winnerName === away.name) return "2";
// //     if (win_or_draw === true && winnerName === home.name) return "1X";
// //     if (win_or_draw === true && winnerName === away.name) return "X2";
// //     return "-";
// //   };

// //   const tip = getTip(prediction, { home, away });

// //   // --- UI ---
// //   return (
// //     <Link to={`/fixtures/${id}`} className="block">
// //       <div className="bg-gray-900 rounded-lg p-3 mb-2 hover:bg-gray-800 transition shadow-sm border border-gray-800">
// //         {/* Tip */}
        

// //         {/* Teams Row */}
// //         <div className="flex justify-between items-center text-gray-100">
// //           {/* Home */}
// //           <div className="flex flex-col items-center w-1/3">
            
// //             <span className="text-center text-sm font-medium">
// //               {home.name ?? "Home"}
// //             </span>

// // {home.logo && (
// //               <img
// //                 src={home.logo}
// //                 alt={home.name}
// //                 className="w-5 h-5 object-contain mb-1"
// //               />
// //             )}

// //           </div>

// //           {/* Score / Status */}
// //           <div className="flex flex-col items-center w-1/3">
// //             <span className="text-gray-400 text-xs">{displayStatus}</span>
// //             <span className="font-semibold text-medium text-white">
// //               {status?.short === "FT" ||
// //               status?.short === "1H" ||
// //               status?.short === "2H"
// //                 ? `${fulltime?.home ?? "-"} - ${fulltime?.away ?? "-"}`
// //                 : "-"}
// //             </span>
// //           </div>

// //           {/* Away */}
// //           <div className="flex flex-col items-center w-1/3">
            
// //             <span className="text-center text-sm font-medium">
// //               {away.name ?? "Away"}
// //             </span>
// //             {away.logo && (
// //               <img
// //                 src={away.logo}
// //                 alt={away.name}
// //                 className="w-5 h-5 object-contain mb-1"
// //               />
// //             )}
// //           </div>



// //         </div>

// // <div className="text-center mb-1">
// //           <span className="bg-teal-500 text-black font-bold px-3 py-1 rounded-full text-sm">
// //             {tip}
// //           </span>
// //         </div>

// //       </div>
// //     </Link>
// //   );
// // };

// // export default FixtureCard;


// import { Link } from "react-router-dom";

// const FixtureCard = ({ fixture }) => {
//   // 🛑 Skip fixture if predictions or winner name is missing/null
//   const prediction = fixture?.predictions?.predictions;
//   const winnerName = prediction?.winner?.name ?? null;

//   if (!prediction || !winnerName) return null;

//   const teams = fixture.teams ?? {};
//   const { home = {}, away = {} } = teams;
//   const fx = fixture.fixture ?? {};
//   const score = fixture.score ?? {};
//   const { status, date, id } = fx;
//   const { fulltime } = score;

//   // --- Format time/status ---
//   const matchDate = date ? new Date(date) : null;
//   const time = matchDate
//     ? matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     : "TBA";

//   let displayStatus = time;
//   if (status?.short === "FT") displayStatus = "FT";
//   else if (status?.short === "HT") displayStatus = "HT";
//   else if (status?.short === "NS") displayStatus = time;
//   else if (status?.short === "1H" || status?.short === "2H")
//     displayStatus = `${status.elapsed}'`;

//   // --- Tip logic ---
//   const getTip = (prediction, teams) => {
//     const { win_or_draw, winner } = prediction;
//     const winnerName = winner?.name;
//     const { home, away } = teams;

//     if (!winnerName) return "-";

//     if (win_or_draw === false && winnerName === home.name) return "1";
//     if (win_or_draw === false && winnerName === away.name) return "2";
//     if (win_or_draw === true && winnerName === home.name) return "1X";
//     if (win_or_draw === true && winnerName === away.name) return "X2";
//     return "-";
//   };

//   const tip = getTip(prediction, { home, away });

//   // --- UI ---
//   return (
//     <Link to={`/fixtures/${id}`} className="block">
//       <div className="bg-gray-900 rounded-xl p-2 mb-1 hover:bg-gray-800 transition-all duration-300 shadow-md border border-gray-800 hover:shadow-lg hover:scale-[1.01]">
//         {/* Teams Row */}
//         <div className="flex justify-between items-center text-gray-100">
//           {/* Home */}
//           <div className="flex flex-col items-center w-1/3">
//             <span className="text-center text-sm font-medium mb-1">
//               {home.name ?? "Home"}
//             </span>
//             {home.logo && (
//               <img
//                 src={home.logo}
//                 alt={home.name}
//                 className="w-6 h-6 object-contain"
//               />
//             )}
//           </div>

//           {/* Score / Status */}
//           <div className="flex flex-col items-center w-1/3">
//             <span className="text-gray-400 text-xs">{displayStatus}</span>
//             <span className="font-semibold text-lg text-white mt-1">
//               {status?.short === "FT" ||
//               status?.short === "1H" ||
//               status?.short === "2H"
//                 ? `${fulltime?.home ?? "-"} - ${fulltime?.away ?? "-"}`
//                 : "-"}
//             </span>
//           </div>

//           {/* Away */}
//           <div className="flex flex-col items-center w-1/3">
//             <span className="text-center text-sm font-medium mb-1">
//               {away.name ?? "Away"}
//             </span>
//             {away.logo && (
//               <img
//                 src={away.logo}
//                 alt={away.name}
//                 className="w-5 h-5 object-contain"
//               />
//             )}
//           </div>
//         </div>

//         {/* Tip Badge */}
//         <div className="flex justify-center ">
//           <span className="bg-teal-500 text-black w-7 h-7 flex items-center justify-center rounded-full text-sm shadow-md border border-teal-400">
//             {tip}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default FixtureCard;


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

  // --- Tip color logic ---
  let tipBg = "bg-orange-200"; // 🟠 Default pale orange if no scores yet

  const homeGoals = fulltime?.home;
  const awayGoals = fulltime?.away;

  if (
    homeGoals !== null &&
    homeGoals !== undefined &&
    awayGoals !== null &&
    awayGoals !== undefined
  ) {
    const isFinished = status?.short === "FT";

    if (isFinished) {
      if (tip === "1" && homeGoals > awayGoals) tipBg = "bg-green-500";
      else if (tip === "2" && awayGoals > homeGoals) tipBg = "bg-green-500";
      else if (tip === "1X" && homeGoals >= awayGoals) tipBg = "bg-green-500";
      else if (tip === "X2" && awayGoals >= homeGoals) tipBg = "bg-green-500";
      else tipBg = "bg-red-500";
    }
  }

  // --- UI ---
  return (
    <Link to={`/fixtures/${id}`} className="block">
      <div className="bg-gray-900 rounded-lg p-2 mb-2 hover:bg-gray-800 transition shadow-sm border border-gray-800">
        {/* Teams Row */}
        <div className="flex justify-between items-center text-gray-100">
          {/* Home */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-center text-sm font-medium truncate w-full block">
              {home.name ?? "Home"}
            </span>

            {home.logo && (
              <img
                src={home.logo}
                alt={home.name}
                className="w-5 h-5 object-contain mb-1"
              />
            )}
          </div>

          {/* Score / Status */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-gray-400 text-xs">{displayStatus}</span>
            <span className="font-semibold text-medium text-white">
              {status?.short === "FT" ||
              status?.short === "1H" ||
              status?.short === "2H"
                ? `${fulltime?.home ?? "-"} - ${fulltime?.away ?? "-"}`
                : "-"}
            </span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-center text-sm font-medium truncate w-full block">
              {away.name ?? "Away"}
            </span>
            {away.logo && (
              <img
                src={away.logo}
                alt={away.name}
                className="w-5 h-5 object-contain mb-1"
              />
            )}
          </div>
        </div>

        {/* Tip Badge */}
<div className="flex justify-center ">          
                    <span className={`${tipBg} text-black w-6 h-6 flex items-center justify-center rounded-full text-sm shadow-md border border-teal-400`}>

             {/* className={`${tipBg} text-black font-bold w-7 h-7 flex items-center justify-center rounded-full text-sm`}
          > */}
            {tip}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
