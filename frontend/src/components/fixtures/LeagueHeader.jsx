// const LeagueHeader = ({ league }) => {
//   if (!league) return null;
//   return (
//     <div className="flex items-center gap-2 mb-4">
//       {league.logo && <img src={league.logo} alt={league.name} className="w-6 h-6" />}
//       <h2 className="font-bold text-lg">{league.name || "Unknown League"}</h2>
//     </div>
//   );
// };
// export default LeagueHeader;


const LeagueHeader = ({ league }) => {
  if (!league) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* League logo */}
      {league.logo && (
        <img
          src={league.logo}
          alt={league.name}
          className="w-6 h-6 object-contain"
        />
      )}

      {/* League info */}
      <div className="flex flex-col leading-tight">
        <h2 className="font-bold text-medium text-white">
          {league.name || "Unknown League"}
        </h2>
        {league.country && (
          <span className="text-sm text-gray-400">{league.country}</span>
        )}
      </div>
    </div>
  );
};

export default LeagueHeader;
