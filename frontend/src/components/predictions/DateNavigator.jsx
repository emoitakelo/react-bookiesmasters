import React, { useRef, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const dateInputRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  // 📅 Open native date picker
  const handleCalendarClick = () => {
    setCalendarOpen(true);
    dateInputRef.current?.showPicker?.(); // trigger native picker
  };

  // ✅ On picking a date → auto-fetch predictions
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (!newDate || loading) return;
    onChangeDate(newDate);
    setCalendarOpen(false);
  };

  // ❌ Close the picker manually
  const handleClose = () => setCalendarOpen(false);

  return (
    <div className="relative max-w-3xl mx-auto flex items-center justify-center my-3 px-8 sm:px-12">
      {/* 🔴 Live Button */}
      <button
        className="absolute left-8 sm:left-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 text-white flex items-center justify-center 
        text-sm sm:text-base hover:bg-teal-700 transition-colors"
      >
        Live
      </button>

      {/* 🗓️ Date Display */}
      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center select-none">
        {formattedDate}
      </span>

      {/* 📅 Calendar / ❌ Toggle Button */}
      {!calendarOpen ? (
        <button
          onClick={handleCalendarClick}
          className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
          rounded-full bg-teal-600 flex items-center justify-center text-white 
          hover:bg-teal-700 transition-colors"
        >
          <CalendarDays size={20} />
        </button>
      ) : (
        <button
          onClick={handleClose}
          className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
          rounded-full bg-red-500 flex items-center justify-center text-white 
          hover:bg-red-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}

      {/* 🧭 Hidden native date input */}
      <input
        ref={dateInputRef}
        type="date"
        value={currentDate}
        onChange={handleDateChange}
        className="absolute opacity-0 pointer-events-none"
        onBlur={() => setCalendarOpen(false)} // auto close after picking/canceling
      />
    </div>
  );
};

export default DateNavigator;
