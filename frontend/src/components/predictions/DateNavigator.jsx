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

const DateNavigator = ({ currentDate, onChangeDate }) => {
  const handlePrevious = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    onChangeDate(prev.toISOString().split("T")[0]);
  };

  const handleNext = () => {
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
    <div className="max-w-md mx-auto flex items-center justify-between gap-4 my-6 px-6 sm:px-10 whitespace-nowrap">
      <button
        onClick={handlePrevious}
        className="bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0"
      >
        ◀ Prev
      </button>

      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center flex-grow">
        {formattedDate}
      </span>

      <button
        onClick={handleNext}
        className="bg-teal-500 text-white px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base font-medium flex-shrink-0"
      >
        Next ▶
      </button>
    </div>
  );
};

export default DateNavigator;
