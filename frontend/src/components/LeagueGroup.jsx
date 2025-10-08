import FixtureCard from "../components/FixtureCard";

const LeagueGroup = ({ league, fixtures }) => (
  <div className="mb-8">
    {/* League Header */}
    <div className="flex items-start gap-3 mb-3 px-2 py-1 border-b border-gray-700">
      {/* League Logo */}
      {league.logo && (
        <img
          src={league.logo}
          alt={league.name}
          className="w-7 h-7 object-contain mt-1"
        />
      )}

      {/* League Info (stacked vertically) */}
      <div className="flex flex-col leading-tight">
        <h3 className="font-semibold text-base text-white">
          {league.name || "Unknown League"}
        </h3>
        {league.country && (
          <span className="text-xs text-gray-500 mt-[1px]">
            {league.country}
          </span>
        )}
      </div>
    </div>

    {/* Fixture List */}
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {fixtures.map((fx, i) => (
        <FixtureCard key={fx.fixture.id || i} fixture={fx} />
      ))}
    </div>
  </div>
);

export default LeagueGroup;
