import TeamInfo from "./TeamInfo";

export default function FixtureCard({ fixture }) {
  const { fixture: fx, teams, goals, tip, homeForm, awayForm } = fixture;

  console.log("🧩 FixtureCard data:", fixture);

  const matchTime = new Date(fx.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const matchDate = new Date(fx.date).toLocaleDateString();

  return (
    <div className="grid grid-cols-4 items-center bg-black shadow rounded-lg p-3 text-sm md:text-base">
      {/* Time/Date */}
      <div className="flex flex-col items-center">
        <span>{matchTime}</span>
        <span className="text-gray-500">{matchDate}</span>
      </div>

      {/* Teams + Forms */}
      <div>
        <TeamInfo team={teams.home} form={homeForm || "-----"} />
        <TeamInfo team={teams.away} form={awayForm || "-----"} />
      </div>

      {/* Tip */}
      <div className="text-center font-semibold text-blue-600">
        {tip || "No tip"}
      </div>

      {/* Score */}
      <div className="flex flex-col items-center">
        <span>{goals?.home ?? "-"}</span>
        <span>{goals?.away ?? "-"}</span>
      </div>
    </div>
  );
}
