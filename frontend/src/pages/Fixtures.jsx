import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // adjust path if different
import LeagueGroup from "../components/LeagueGroup";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchFixtures(currentDate);
  }, [currentDate]);

  const fetchFixtures = async (date) => {
    try {
      const res = await axiosInstance.get(`/fixtures/date/${date}`);
      setFixtures(res.data);
    } catch (err) {
      console.error("Error fetching fixtures:", err);
    }
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  // 🧠 Filter fixtures: only include those with valid predictions & winner name
  const filteredFixtures = fixtures.filter((fx) => {
    const prediction = fx?.predictions?.predictions;
    const winnerName = prediction?.winner?.name ?? null;
    return prediction && winnerName;
  });

  // 🧩 Group filtered fixtures by league
  const grouped = filteredFixtures.reduce((acc, fx) => {
    const league = fx.league?.name ?? "Unknown League";
    if (!acc[league]) acc[league] = [];
    acc[league].push(fx);
    return acc;
  }, {});

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          className="px-3 py-1 bg-gray-700 rounded"
          onClick={() => changeDate(-1)}
        >
          ◀ Previous
        </button>

        <span className="font-bold text-lg">{currentDate}</span>

        <button
          className="px-3 py-1 bg-gray-700 rounded"
          onClick={() => changeDate(1)}
        >
          Next ▶
        </button>

        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
      </div>

      {/* 🧾 Conditional rendering */}
      {Object.keys(grouped).length === 0 ? (
        <p className="text-center text-gray-400 italic">
          No valid predictions found for this date
        </p>
      ) : (
        Object.keys(grouped).map((league) => (
          <LeagueGroup
            key={league}
            league={grouped[league][0].league}
            fixtures={grouped[league]}
          />
        ))
      )}
    </div>
  );
};

export default Fixtures;
