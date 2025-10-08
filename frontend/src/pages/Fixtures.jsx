// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance"; // adjust path if different
// import LeagueGroup from "../components/LeagueGroup";

// const Fixtures = () => {
//   const [fixtures, setFixtures] = useState([]);
//   const [currentDate, setCurrentDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   useEffect(() => {
//     fetchFixtures(currentDate);
//   }, [currentDate]);

//   const fetchFixtures = async (date) => {
//     try {
//       const res = await axiosInstance.get(`/fixtures/date/${date}`);
//       setFixtures(res.data);
//     } catch (err) {
//       console.error("Error fetching fixtures:", err);
//     }
//   };

//   const changeDate = (days) => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + days);
//     setCurrentDate(newDate.toISOString().split("T")[0]);
//   };

//   // 🧠 Filter fixtures: only include those with valid predictions & winner name
//   const filteredFixtures = fixtures.filter((fx) => {
//     const prediction = fx?.predictions?.predictions;
//     const winnerName = prediction?.winner?.name ?? null;
//     return prediction && winnerName;
//   });

//   // 🧩 Group filtered fixtures by league
//   const grouped = filteredFixtures.reduce((acc, fx) => {
//     const league = fx.league?.name ?? "Unknown League";
//     if (!acc[league]) acc[league] = [];
//     acc[league].push(fx);
//     return acc;
//   }, {});

//   return (
//     <div className="p-4 text-white bg-black min-h-screen">
//       {/* Controls */}
//       <div className="flex justify-center items-center gap-4 mb-6">
//         <button
//           className="px-3 py-1 bg-gray-700 rounded"
//           onClick={() => changeDate(-1)}
//         >
//           ◀ Previous
//         </button>

//         <span className="font-bold text-lg">{currentDate}</span>

//         <button
//           className="px-3 py-1 bg-gray-700 rounded"
//           onClick={() => changeDate(1)}
//         >
//           Next ▶
//         </button>

//         <input
//           type="date"
//           value={currentDate}
//           onChange={(e) => setCurrentDate(e.target.value)}
//           className="px-2 py-1 rounded text-black"
//         />
//       </div>

//       {/* 🧾 Conditional rendering */}
//       {Object.keys(grouped).length === 0 ? (
//         <p className="text-center text-gray-400 italic">
//           No valid predictions found for this date
//         </p>
//       ) : (
//         Object.keys(grouped).map((league) => (
//           <LeagueGroup
//             key={league}
//             league={grouped[league][0].league}
//             fixtures={grouped[league]}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default Fixtures;


import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import LeagueGroup from "../components/LeagueGroup";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAllFixtures();
  }, []);

  const fetchAllFixtures = async () => {
    try {
      const res = await axiosInstance.get(`/fixtures/all`);
      const allFixtures = res.data || [];

      // ✅ Filter only those with predictions + winner name
      const filtered = allFixtures.filter((fx) => {
        const prediction = fx?.predictions?.predictions;
        const winnerName = prediction?.winner?.name ?? null;
        return prediction && winnerName;
      });

      // ✅ Group by date
      const groupedByDate = filtered.reduce((acc, fx) => {
        const date = fx.fixture?.date?.split("T")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(fx);
        return acc;
      }, {});

      // Sort dates ascending
      const dates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));

      setFixtures(groupedByDate);
      setAvailableDates(dates);

      // Start at the most recent date (latest)
      if (dates.length > 0) setCurrentIndex(dates.length - 1);
    } catch (err) {
      console.error("Error fetching fixtures:", err);
    }
  };

  const currentDate = availableDates[currentIndex];
  const groupedFixtures = fixtures[currentDate] || [];

  const changeDate = (direction) => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < availableDates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          className={`px-3 py-1 rounded ${
            currentIndex === 0 ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
          }`}
          disabled={currentIndex === 0}
          onClick={() => changeDate("prev")}
        >
          ◀ Prev
        </button>

        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold text-white">Fixtures</span>
          {currentDate ? (
            <span className="text-sm text-gray-400 mt-1">{currentDate}</span>
          ) : (
            <span className="text-sm text-gray-500 mt-1">No date</span>
          )}
        </div>

        <button
          className={`px-3 py-1 rounded ${
            currentIndex === availableDates.length - 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          disabled={currentIndex === availableDates.length - 1}
          onClick={() => changeDate("next")}
        >
          Next ▶
        </button>
      </div>

      {/* Fixtures List */}
      {groupedFixtures.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          No valid predictions found for this date
        </p>
      ) : (
        Object.values(
          groupedFixtures.reduce((acc, fx) => {
            const league = fx.league?.name ?? "Unknown League";
            if (!acc[league]) acc[league] = [];
            acc[league].push(fx);
            return acc;
          }, {})
        ).map((fixtures, i) => (
          <LeagueGroup
            key={fixtures[0].league?.id || i}
            league={fixtures[0].league}
            fixtures={fixtures}
          />
        ))
      )}
    </div>
  );
};

export default Fixtures;
