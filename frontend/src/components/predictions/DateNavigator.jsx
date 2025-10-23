


// src/components/predictions/DateNavigator.jsx
import React from "react";

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const today = new Date();
  const selected = new Date(currentDate);

  // Calculate difference in days from today
  const diffDays = Math.floor(
    (selected.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

  // Disable conditions
  const reachedPrevLimit = diffDays <= -7;
  const reachedNextLimit = diffDays >= 7;

  const handlePrevious = () => {
    if (loading || reachedPrevLimit) return;
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    onChangeDate(prev.toISOString().split("T")[0]);
  };

  const handleNext = () => {
    if (loading || reachedNextLimit) return;
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    onChangeDate(next.toISOString().split("T")[0]);
  };

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  // Helper for button style
  const getButtonClass = (isLimitReached) => {
    if (isLimitReached) return "bg-gray-400 cursor-not-allowed text-white";
    return "bg-teal-500 text-white";
  };

  return (
  <div className="max-w-3xl mx-auto flex items-center justify-between gap-1 my-2 px-4 sm:px-6">
    {/* ◀ Left arrow */}
    <button
      onClick={handlePrevious}
      disabled={loading || reachedPrevLimit}
      className={`text-teal-600 text-5xl sm:text-6xl transition-transform duration-200 
        hover:scale-110 active:scale-95 
        ${reachedPrevLimit ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      &lt;
    </button>

    {/* Date display */}
    <span className="text-medium sm:text-lg font-semibold text-gray-800 text-center flex-grow">
      {formattedDate}
    </span>

    {/* ▶ Right arrow */}
    <button
      onClick={handleNext}
      disabled={loading || reachedNextLimit}
      className={`text-teal-600 text-5xl sm:text-6xl transition-transform duration-200 
        hover:scale-110 active:scale-95 
        ${reachedNextLimit ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      &gt;
    </button>
  </div>
);

};

export default DateNavigator;
