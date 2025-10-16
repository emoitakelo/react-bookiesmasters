import React, { useEffect, useState } from "react";
import PredictionList from "../components/predictions/PredictionList";
import DateNavigator from "../components/predictions/DateNavigator";
import axiosInstance from "../utils/axiosInstance";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => {
    // ✅ Always keep YYYY-MM-DD (no time zone shift)
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/predictions?date=${currentDate}`);
        if (res.data.success && res.data.data) {
          setPredictions(res.data.data);
        } else {
          setPredictions([]);
        }
      } catch (err) {
        console.error("❌ Error fetching predictions:", err);
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [currentDate]);

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
        Football Predictions
      </h1>

      <DateNavigator currentDate={currentDate} onChangeDate={setCurrentDate} />

      {loading ? (
        <p className="text-center text-gray-500">Loading predictions...</p>
      ) : predictions.length > 0 ? (
        <PredictionList predictions={predictions} />
      ) : (
        <p className="text-center text-gray-500">
          No predictions available for this date.
        </p>
      )}
    </main>
  );
};

export default Predictions;
