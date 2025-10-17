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

const DateNavigator = ({
  currentDate,
  onChangeDate,
  loading,
  disablePrev,
  disableNext,
}) => {
  const handlePrevious = () => {
    if (loading || disablePrev) return; // prevent clicks while loading
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    onChangeDate(prev.toISOString().split("T")[0]);
  };

  const handleNext = () => {
    if (loading || disableNext) return; // prevent clicks while loading
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
    <div className="max-w-md mx-auto flex items-center justify-between gap-2 my-6 px-2 sm:px-4 whitespace-nowrap">
      <button
        onClick={handlePrevious}
        disabled={loading || disablePrev}
        className={`w-24 sm:w-28 px-1 sm:px-2 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0
          ${
            loading || disablePrev
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
      >
        ◀ Prev
      </button>

      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center flex-grow">
        {formattedDate}
      </span>

      <button
        onClick={handleNext}
        disabled={loading || disableNext}
        className={`w-24 sm:w-28 px-1 sm:px-2 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0
          ${
            loading || disableNext
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
      >
        Next ▶
      </button>
    </div>
  );
};

export default DateNavigator;
