// components/predictions/FormBadge.tsx
import React from "react";

interface FormBadgeProps {
  result: string;
}

const FormBadge: React.FC<FormBadgeProps> = ({ result }) => {
  const color = result === "W" ? "bg-green-500" : result === "D" ? "bg-orange-500" : "bg-red-500";
  
  return (
    <span className={`px-2 py-1 rounded text-white text-xs ${color}`}>
      {result}
    </span>
  );
};

export default FormBadge;
