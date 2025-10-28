import React from "react";
import { CalendarDays } from "lucide-react";

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
    <div className="relative max-w-3xl mx-auto flex items-center justify-center my-3 px-8 sm:px-12">
      {/* 🔴 Live Button (moved inward) */}
      <button
        className="absolute left-8 sm:left-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 text-white flex items-center justify-center 
        text-sm sm:text-base hover:bg-teal-700 transition-colors
        outline-none border-none focus:outline-none active:outline-none ring-0"
      >
        Live
      </button>

      {/* 📅 Date Display */}
      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center select-none">
        {formattedDate}
      </span>

      {/* 📆 Calendar Button (moved inward) */}
      <button
        className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 flex items-center justify-center text-white 
        hover:bg-teal-700 transition-colors
        outline-none border-none focus:outline-none active:outline-none ring-0"
      >
        <CalendarDays size={20} className="sm:w-6 sm:h-6 text-white" />
      </button>
    </div>
  );
};

export default DateNavigator;
