import React, { useEffect, useState } from "react";
import axios from "axios";
import PredictionCard from "../components/PredictionCard";
import axiosInstance from "../utils/axiosInstance";

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeOffset, setActiveOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => date.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const displayDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });

  const fetchPredictions = async (date) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/predictions/by-date/${formatDate(date)}`);

      console.log("✅ Raw prediction response:", res.data);
      setPredictions(res.data);
    } catch (err) {
      console.error("❌ Error fetching predictions:", err);
      setPredictions([]); // in case of error, clear old data
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (offset) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
    setActiveOffset(offset);
    setPredictions([]); // clear old data while fetching new
  };

  useEffect(() => {
    fetchPredictions(selectedDate);
  }, [selectedDate]);

  return (
    <div className="container mt-0" style={{ fontSize: 'clamp(12px, 2vw, 20px)'}}>
      {/* Date Filter Buttons */}
      <div className="row g-3 mb-2">
        <div className="col-4">
          <button
            className={`btn w-100 ${activeOffset === -1 ? "btn-teal" : "btn-inactive"}`}
            onClick={() => handleDateChange(-1)}
          >
            Yesterday
          </button>
        </div>
        <div className="col-4">
          <button
            className={`btn w-100 ${activeOffset === 0 ? "btn-teal" : "btn-inactive"}`}
            onClick={() => handleDateChange(0)}
          >
            Today
          </button>
        </div>
        <div className="col-4">
          <button
            className={`btn w-100 ${activeOffset === 1 ? "btn-teal" : "btn-inactive"}`}
            onClick={() => handleDateChange(1)}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* Heading */}
      <h4 className="text-center text-uppercase fw-semibold" style={{ color: "#00796b" }}>
        Free Expert Tips
      </h4>
      <p className="text-center text-muted small mb-4">{displayDate(selectedDate)}</p>

      {/* Predictions */}
      <div className="row">
        {loading ? (
          <div className="text-center text-muted py5">Loading predictions...</div>
        ) : predictions.length > 0 ? (
          predictions.map((pred) => (
            <div className="col-12 mb-3" key={pred.fixtureId}>
              <PredictionCard prediction={pred} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No predictions found for this date.</div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
