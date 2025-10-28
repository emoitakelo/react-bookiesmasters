// src/components/predictions/DateNavigator.jsx
import React, { useRef } from "react";
import { CalendarDays } from "lucide-react";

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const dateInputRef = useRef(null);

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // modern browsers
      dateInputRef.current.focus();
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (!newDate || loading) return;
    onChangeDate(newDate);
  };

  return (
    <div className="relative max-w-3xl mx-auto flex items-center justify-center my-3 px-8 sm:px-12">
      {/* 🔴 Live Button (inward aligned) */}
      <button
        className="absolute left-8 sm:left-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 text-white flex items-center justify-center 
        text-sm sm:text-base hover:bg-teal-700 transition-colors
        outline-none border-none focus:outline-none active:outline-none ring-0"
      >
        Live
      </button>

      {/* 🗓️ Date Display */}
      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center select-none">
        {formattedDate}
      </span>

      {/* 📅 Calendar Button */}
      <button
        onClick={handleCalendarClick}
        className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 flex items-center justify-center text-white 
        hover:bg-teal-700 transition-colors
        outline-none border-none focus:outline-none active:outline-none ring-0"
      >
        <CalendarDays size={20} className="sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Hidden native date input */}
      <input
        ref={dateInputRef}
        type="date"
        value={currentDate}
        onChange={handleDateChange}
        max={new Date().toISOString().split("T")[0]} // optional limit: up to today
        className="absolute right-0 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default DateNavigator;
