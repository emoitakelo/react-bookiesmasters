import React, { useEffect, useState, useCallback } from "react";
import PredictionList from "../components/predictions/PredictionList";
import DateNavigator from "../components/predictions/DateNavigator";
import Loader from "../components/common/Loader";
import axiosInstance from "../utils/axiosInstance";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // 🧭 Limit navigation to ±7 days
  const today = new Date();
  const startLimit = new Date(today);
  const endLimit = new Date(today);
  startLimit.setDate(today.getDate() - 7);
  endLimit.setDate(today.getDate() + 7);

  const canGoPrev = new Date(currentDate) > startLimit;
  const canGoNext = new Date(currentDate) < endLimit;

  const fetchPredictions = useCallback(async (date) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/predictions?date=${date}`);
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
  }, []);

  useEffect(() => {
    fetchPredictions(currentDate);
  }, [currentDate, fetchPredictions]);

  const handleChangeDate = (newDate) => {
    if (loading) return; // ⛔ Prevent navigation while loading
    setCurrentDate(newDate);
  };

  return (
    <main className="max-w-3xl mx-auto px-1 sm:px-3 ">
     

      <DateNavigator
        currentDate={currentDate}
        onChangeDate={handleChangeDate}
        loading={loading}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
      />

      {loading ? (
        <Loader size={10} color="teal-500" height="h-40" />
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
