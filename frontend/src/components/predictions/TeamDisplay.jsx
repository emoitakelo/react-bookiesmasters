const TeamDisplay = ({ home, away, date }) => {
  const matchDate = new Date(date).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex justify-between items-center w-full max-w-md">
        <img src={home.logo} alt={home.name} className="w-20 h-20 object-contain" />
        <div className="text-gray-600 text-sm text-center">{matchDate}</div>
        <img src={away.logo} alt={away.name} className="w-20 h-20 object-contain" />
      </div>
      <div className="flex justify-between w-full max-w-md mt-2 text-sm font-medium">
        <span className="text-center w-1/2">{home.name}</span>
        <span className="text-center w-1/2">{away.name}</span>
      </div>
    </div>
  );
};

export default TeamDisplay;
