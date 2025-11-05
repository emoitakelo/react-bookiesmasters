"use client";
import React, { useState } from "react";
import { CalendarDays, X, ChevronLeft, ChevronRight } from "lucide-react";

interface DateNavigatorProps {
  currentDate: string;
  onChangeDate: (date: string) => void;
  loading: boolean;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onChangeDate,
  loading,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(new Date());

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const handleCalendarToggle = () => setShowCalendar((s) => !s);

  const handleDateClick = (date: Date) => {
    if (loading) return;
    const isoDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    onChangeDate(isoDate);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [...Array(daysInMonth).keys()].map((i) => i + 1);
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="relative max-w-xl mx-auto flex items-center justify-center my-3 px-8 sm:px-12">
      {/* 🟢 Live Button */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        className="absolute left-5 sm:left-10 w-8 h-7 sm:w-10 sm:h-19 rounded-full
          bg-teal-700 text-white flex items-center justify-center text-xs sm:text-sm
          transition-colors focus:outline-none focus:ring-0"
      >
        Live
      </button>

      {/* 🗓️ Current Date Display */}
      <span className="text-medium sm:text-medium font-semibold text-teal-950 text-center select-none">
        {formattedDate}
      </span>

      {/* 📅 Calendar Toggle */}
      <button
        type="button"
        onClick={handleCalendarToggle}
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute right-5 sm:right-10 w-8 h-7 sm:w-10 sm:h-9 rounded-full
          flex items-center justify-center text-white transition-colors
          ${showCalendar ? "bg-teal-700 hover:bg-teal-700" : "bg-teal-700"}`}
        aria-expanded={showCalendar}
      >
        {showCalendar ? <X size={18} /> : <CalendarDays size={20} />}
      </button>

      {/* 🧭 Calendar Popup */}
      {showCalendar && (
        <div
          className="absolute right-4 sm:right-12 top-12 bg-white border border-gray-200 rounded-lg
            shadow-lg p-3 z-50 w-64"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handlePrevMonth}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="font-semibold text-gray-800 text-sm select-none">
              {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </span>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleNextMonth}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-gray-600 text-xs font-semibold mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {[...Array(firstDay).keys()].map((i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map((day) => {
              const dateObj = new Date(year, month, day);
              const iso = dateObj.toLocaleDateString("en-CA");
              const isToday = iso === today;
              const isSelected = iso === currentDate;

              return (
                <button
                  key={day}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleDateClick(dateObj)}
                  className={`text-sm w-8 h-8 rounded-md transition-colors
                    ${isSelected ? "bg-teal-600 text-white" : ""}
                    ${
                      !isSelected && isToday
                        ? "border border-teal-500 text-teal-700"
                        : ""
                    }
                    ${
                      !isSelected && !isToday
                        ? "hover:bg-teal-500 hover:text-white text-gray-800"
                        : ""
                    }
                    focus:outline-none focus:ring-0`}
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
