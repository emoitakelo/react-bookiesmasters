import React, { useState } from "react";
import { CalendarDays, X, ChevronLeft, ChevronRight } from "lucide-react";

const DateNavigator = ({ currentDate, onChangeDate, loading }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  // 🗓️ Format date nicely
  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  // 🔄 Toggle calendar visibility
  const handleCalendarToggle = () => setShowCalendar(!showCalendar);

  // ✅ Handle date selection (no UTC shift)
  const handleDateClick = (date) => {
    const isoDate = date.toLocaleDateString("en-CA"); // keeps local YYYY-MM-DD
    if (loading) return;
    onChangeDate(isoDate);
    setShowCalendar(false);
  };

  // ⏪ Previous / Next month navigation
  const handlePrevMonth = () => {
    const prev = new Date(viewDate);
    prev.setMonth(prev.getMonth() - 1);
    setViewDate(prev);
  };
  const handleNextMonth = () => {
    const next = new Date(viewDate);
    next.setMonth(next.getMonth() + 1);
    setViewDate(next);
  };

  // 🧮 Build calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const today = new Date().toLocaleDateString("en-CA");

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

      {/* 📅 Calendar Toggle / ❌ Close */}
      <button
        onClick={handleCalendarToggle}
        className="absolute right-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10 
        rounded-full bg-teal-600 flex items-center justify-center text-white 
        hover:bg-teal-700 transition-colors outline-none border-none 
        focus:outline-none active:outline-none ring-0"
      >
        {showCalendar ? <X size={18} /> : <CalendarDays size={20} />}
      </button>

      {/* 🧭 Custom Calendar */}
      {showCalendar && (
        <div className="absolute right-4 sm:right-12 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-64">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded hover:bg-gray-100 transition 
              outline-none border-none focus:outline-none active:outline-none ring-0"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold text-gray-800 text-sm select-none">
              {viewDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded hover:bg-gray-100 transition 
              outline-none border-none focus:outline-none active:outline-none ring-0"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 text-center text-gray-600 text-xs font-semibold mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {[...Array(firstDay).keys()].map((i) => (
              <div key={`e-${i}`} />
            ))}
            {days.map((day) => {
              const dateObj = new Date(year, month, day);
              const iso = dateObj.toLocaleDateString("en-CA");
              const isToday = iso === today;
              const isSelected = iso === currentDate;

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(dateObj)}
                  className={`text-sm w-8 h-8 rounded-md transition-colors 
                  outline-none border-none focus:outline-none active:outline-none ring-0 ${
                    isSelected
                      ? "bg-teal-600 text-white"
                      : isToday
                      ? "border border-teal-500 text-teal-700"
                      : "hover:bg-teal-500 hover:text-white text-gray-800"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateNavigator;
