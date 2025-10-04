import MatchCard from "./MatchCard";

const H2HSection = ({ h2h }) => {
  return (
    <div className="mb-4 p-4 bg-gray-800 rounded">
      <h3 className="font-semibold mb-2">Head-to-Head</h3>
      {Array.isArray(h2h) && h2h.length > 0 ? (
        <div className="flex flex-col gap-2">
          {h2h.map((m, i) => <MatchCard key={i} match={m} />)}
        </div>
      ) : (
        <div className="text-gray-400">No H2H data available</div>
      )}
    </div>
  );
};
export default H2HSection;
