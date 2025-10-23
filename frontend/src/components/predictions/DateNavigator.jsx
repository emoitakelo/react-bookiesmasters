// src/components/predictions/DateNavigator.jsx
import React from "react";
import { CalendarDays } from "lucide-react"; // calendar icon

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const today = new Date();
  const selected = new Date(currentDate);

  const diffDays = Math.floor(
    (selected.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

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

  return (
    <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 my-3 px-4 sm:px-6">
      {/* 🔴 Live Button */}
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 text-white font-semibold flex items-center justify-center text-sm sm:text-base hover:bg-teal-700 transition-colors focus:outline-none active:outline-none"
      >
        Live
      </button>

      {/* ◀ Left arrow */}
      <button
        onClick={handlePrevious}
        disabled={loading || reachedPrevLimit}
        className={`text-teal-600 text-4xl sm:text-5xl transition-transform duration-200 
          hover:scale-110 active:scale-95 focus:outline-none active:outline-none
          ${reachedPrevLimit ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        &lt;
      </button>

      {/* Date display */}
      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center flex-grow">
        {formattedDate}
      </span>

      {/* ▶ Right arrow */}
      <button
        onClick={handleNext}
        disabled={loading || reachedNextLimit}
        className={`text-teal-600 text-4xl sm:text-5xl transition-transform duration-200 
          hover:scale-110 active:scale-95 focus:outline-none active:outline-none
          ${reachedNextLimit ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        &gt;
      </button>

      {/* 📅 Calendar button */}
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-teal-600 text-teal-600 flex items-center justify-center hover:bg-teal-50 transition-colors focus:outline-none active:outline-none"
      >
        <CalendarDays size={22} className="sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default DateNavigator;
