import React from "react";

const Loader = ({ size = 10, color = "teal-500", height = "h-40" }) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
