// import React from "react";

// const DateNavigator = ({ currentDate, onChangeDate }) => {
//   const handlePrevious = () => {
//     const prev = new Date(currentDate);
//     prev.setDate(prev.getDate() - 1);
//     onChangeDate(prev.toISOString().split("T")[0]);
//   };

//   const handleNext = () => {
//     const next = new Date(currentDate);
//     next.setDate(next.getDate() + 1);
//     onChangeDate(next.toISOString().split("T")[0]);
//   };

//   return (
//     <div className="flex items-center justify-center sm:justify-between my-6">
//       <button
//         onClick={handlePrevious}
//         className="bg-teal-500 px-4 py-2 rounded-lg font-medium"
//       >
//         ◀ Previous
//       </button>

//       <span className="text-lg sm:text-xl font-semibold text-gray-800">
//         {new Date(currentDate).toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </span>

//       <button
//         onClick={handleNext}
//         className="bg-teal-500 px-4 py-2 rounded-lg font-medium"
//       >
//         Next ▶
//       </button>
//     </div>
//   );
// };

// export default DateNavigator;


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
    <div className="max-w-md mx-auto flex items-center justify-between gap-2 my-6 px-2 sm:px-4 whitespace-nowrap">
      <button
        onClick={handlePrevious}
        disabled={loading || reachedPrevLimit}
        className={`w-24 sm:w-28 px-1 sm:px-2 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0 ${getButtonClass(
          reachedPrevLimit
        )}`}
      >
        ◀ Prev
      </button>

      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center flex-grow">
        {formattedDate}
      </span>

      <button
        onClick={handleNext}
        disabled={loading || reachedNextLimit}
        className={`w-24 sm:w-28 px-1 sm:px-2 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0 ${getButtonClass(
          reachedNextLimit
        )}`}
      >
        Next ▶
      </button>
    </div>
  );
};

export default DateNavigator;
