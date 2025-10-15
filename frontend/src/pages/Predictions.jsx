import React, { useEffect, useState } from "react";
import PredictionList from "../components/predictions/PredictionList";
import axiosInstance from "../utils/axiosInstance";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await axiosInstance.get("/predictions/today");
        if (res.data.success && res.data.data) {
          setPredictions(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching predictions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Today's Predictions
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading predictions...</p>
      ) : (
        <PredictionList predictions={predictions} />
      )}
    </main>
  );
};

export default Predictions;
