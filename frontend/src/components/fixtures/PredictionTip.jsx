const PredictionTip = ({ prediction, teams }) => {
  if (!prediction) return (
    <div className="mb-2 text-center p-2 bg-gray-800 rounded text-gray-400">
      No prediction advice available
    </div>
  );

  const advice = prediction.advice ?? null;

  return (
    <div className="mb-2 text-center p-2 bg-gray-800 rounded font-semibold text-yellow-400">
      {advice || "No advice"}
    </div>
  );
};
export default PredictionTip;
