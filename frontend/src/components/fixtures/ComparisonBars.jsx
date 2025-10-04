const ComparisonBars = ({ comparison }) => {
  if (!comparison) return <div className="mb-4 text-gray-400">No comparison data available</div>;

  const tryPercent = (v) => {
    if (!v && v !== 0) return 50;
    const n = Number(String(v).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 50;
  };

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded">
      <h3 className="font-semibold mb-2">Comparison</h3>
      {["form", "att", "def", "goals", "total", "h2h"].map((key) => {
        const comp = comparison[key];
        if (!comp) return null;

        const homePct = tryPercent(comp.home);
        const awayPct = 100 - homePct;

        return (
          <div key={key} className="mb-3">
            <div className="flex justify-between mb-1 text-sm">
              <span className="capitalize">{key}</span>
              <span>
                {String(comp.home ?? "-")} vs {String(comp.away ?? "-")}
              </span>
            </div>
            <div className="w-full bg-gray-900 h-4 rounded overflow-hidden">
              <div style={{ width: `${homePct}%` }} className="h-4 rounded-l bg-teal-500 inline-block"></div>
              <div style={{ width: `${awayPct}%` }} className="h-4 rounded-r bg-gray-700 inline-block"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ComparisonBars;
