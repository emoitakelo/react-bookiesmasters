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
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5eead4] text-white font-semibold flex items-center justify-center text-sm sm:text-base hover:bg-teal-700 transition-colors 
        outline-none border-none focus:outline-none active:outline-none ring-0 focus:ring-0 active:ring-0"
      >
        Live
      </button>

      {/* ◀ Left arrow */}
      <button
        onClick={handlePrevious}
        disabled={loading || reachedPrevLimit}
        className={`text-[#5eead4] text-5xl sm:text-6xl transition-transform duration-200 
          hover:scale-110 active:scale-95 
          outline-none border-none focus:outline-none active:outline-none ring-0 focus:ring-0 active:ring-0
          ${reachedPrevLimit ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        &lt;
      </button>

      {/* Date display */}
      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center flex-grow select-none">
        {formattedDate}
      </span>

      {/* ▶ Right arrow */}
      <button
        onClick={handleNext}
        disabled={loading || reachedNextLimit}
        className={`text-[#5eead4] text-5xl sm:text-6xl transition-transform duration-200 
          hover:scale-110 active:scale-95 
          outline-none border-none focus:outline-none active:outline-none ring-0 focus:ring-0 active:ring-0
          ${reachedNextLimit ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        &gt;
      </button>

      {/* 📅 Calendar button (now teal background + white icon) */}
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5eead4] flex items-center justify-center 
        text-white hover:bg-teal-700 transition-colors 
        outline-none border-none focus:outline-none active:outline-none ring-0 focus:ring-0 active:ring-0"
      >
        <CalendarDays size={21} className="sm:w-6 sm:h-6 text-white" />
      </button>
    </div>
  );
};

export default DateNavigator;
