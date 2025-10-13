import FixtureCard from "./FixtureCard";

export default function LeagueGroup({ league, fixtures }) {
  return (
    <div className="mb-6 ">
      <h2 className="text-l font-bold mb-2 border-b pb-1 bg-black">
        {league.name}
      </h2>
      <div className="flex flex-col gap-2">
        {fixtures.map((fixture) => (
          <FixtureCard key={fixture.fixture.id} fixture={fixture} />
        ))}
      </div>
    </div>
  );
}
