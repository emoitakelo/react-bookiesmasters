import MatchCard from "./MatchCard";

const RecentMatches = ({ matches, title }) => {
  return (
    <div className="mb-4 p-4 bg-gray-800 rounded">
      <h3 className="font-semibold mb-2">{title}</h3>
      {matches && matches.length > 0 ? (
        <div className="flex flex-col gap-2">
          {matches.map((m, i) => <MatchCard key={i} match={m} />)}
        </div>
      ) : (
        <div className="text-gray-400">No recent matches found</div>
      )}
    </div>
  );
};
export default RecentMatches;
