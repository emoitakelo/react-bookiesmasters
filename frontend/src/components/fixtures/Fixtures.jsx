import { useState, useEffect } from "react";
import LeagueGroup from "./LeagueGroup";
import axiosInstance from "@/utils/axiosInstance"; // ✅ fixed import path for Vite (avoid "@")

export default function Fixtures() {
  const [date, setDate] = useState(new Date());
  const [groupedFixtures, setGroupedFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFixtures = async (d) => {
    try {
      setLoading(true);
      setError("");
      const formatted = d.toISOString().split("T")[0];
      console.log("📅 Fetching fixtures for:", formatted);

      const res = await axiosInstance.get(`/fixtures/${formatted}`);
      console.log("✅ Fixtures API response:", res.data);

      // ✅ Handle either grouped or flat fixture arrays
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.grouped || res.data.fixtures || [];

      setGroupedFixtures(data);
    } catch (err) {
      console.error("❌ Error fetching fixtures:", err);
      setError("Failed to load fixtures");
      setGroupedFixtures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures(date);
  }, [date]);

  const handlePrev = () =>
    setDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));

  const handleNext = () =>
    setDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));

  return (
    <div className="p-4 min-h-screen bg-black-50">
      {/* Navigation */}
      <div className="flex justify-center items-center mt-12 gap-4 mb-4">
        <button
          onClick={handlePrev}
          className="px-3 py-1 bg-black rounded"
        >
          Prev
        </button>

        <span className="text-lg font-semibold text-gray-700">
          {date.toISOString().split("T")[0]}
        </span>

        <button
          onClick={handleNext}
          className="px-3 py-1 bg-black rounded"
        >
          Next
        </button>
      </div>

      {/* Fixtures */}
      {loading ? (
        <p className="text-center text-gray-600">Loading fixtures...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : groupedFixtures.length > 0 ? (
        groupedFixtures.map((group, i) => (
          <LeagueGroup
            key={group.league?.id || i}
            league={group.league}
            fixtures={group.fixtures || []}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No fixtures available.</p>
      )}
    </div>
  );
}
