import React from "react";

// Props interface
interface MatchInfoProps {
  venue?: string; // venue is optional
}

const MatchInfo: React.FC<MatchInfoProps> = ({ venue }) => {
  // If no venue, render nothing
  if (!venue) return null;

  return (
    <div className="text-center text-gray-500 mb-4">
      <p>{venue}</p>
    </div>
  );
};

export default MatchInfo;
