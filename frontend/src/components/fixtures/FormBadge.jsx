export default function FormBadge({ result }) {
  const colorMap = {
    W: "bg-green-500",
    D: "bg-orange-300",
    L: "bg-red-500",
  };
  return (
    <span
      className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-xs ${colorMap[result] || "bg-gray-300"}`}
    >
      {result}
    </span>
  );
}
