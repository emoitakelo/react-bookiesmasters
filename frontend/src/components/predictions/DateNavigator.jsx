import React, { useRef, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const dateInputRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const handleCalendarClick = () => {
    setShowCalendar(true);
    setTimeout(() => dateInputRef.current?.showPicker?.(), 0); // trigger native calendar
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (!newDate || loading) return;
    onChangeDate(newDate);
    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto flex items-center justify-center my-3 px-8 sm:px-12">
      {/* 🔴 Live Button */}
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
      {!showCalendar ? (
        <button
          onClick={handleCalendarClick}
          className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
          rounded-full bg-teal-600 flex items-center justify-center text-white 
          hover:bg-teal-700 transition-colors outline-none border-none focus:outline-none"
        >
          <CalendarDays size={20} className="sm:w-6 sm:h-6 text-white" />
        </button>
      ) : (
        <button
          onClick={handleCloseCalendar}
          className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
          rounded-full bg-red-500 flex items-center justify-center text-white 
          hover:bg-red-600 transition-colors outline-none border-none focus:outline-none"
        >
          <X size={18} className="text-white" />
        </button>
      )}

      {/* Hidden native date input */}
      {showCalendar && (
        <input
          ref={dateInputRef}
          type="date"
          value={currentDate}
          onChange={handleDateChange}
          className="absolute right-4 sm:right-12 top-12 opacity-100 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm cursor-pointer z-50"
        />
      )}
    </div>
  );
};

export default DateNavigator;
