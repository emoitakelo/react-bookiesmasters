import React from "react";

// 🧩 Props interface
interface PredictionAdviceProps {
  tip?: string; // optional string
}

const PredictionAdvice: React.FC<PredictionAdviceProps> = ({ tip }) => {
  if (!tip) return null; // optionally render nothing if no tip

  return (
    <div className="text-center mb-6">
      <p className="text-teal-600 text-lg font-semibold">{tip}</p>
    </div>
  );
};

export default PredictionAdvice;
