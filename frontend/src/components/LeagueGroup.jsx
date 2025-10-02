import FixtureCard from "../components/FixtureCard";

const LeagueGroup = ({ league, fixtures }) => (
  <div className="mb-8">
    {/* League Header */}
    <div className="flex items-center gap-2 mb-2 px-2 py-1 border-b border-gray-700">
      <img src={league.logo} alt={league.name} className="w-6 h-6" />
      <h3 className="font-semibold">{league.name}</h3>
      <span className="text-gray-400 text-sm">({league.country})</span>
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
