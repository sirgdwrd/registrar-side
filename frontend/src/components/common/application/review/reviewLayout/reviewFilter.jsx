import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const ReviewFilter = ({ onFilterChange }) => {
  const [visible, setVisible] = useState(false);
  const [gradeLevel, setGradeLevel] = useState("All Levels");
  const [session, setSession] = useState("All Sessions");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ gradeLevel, session });
    }
  }, [gradeLevel, session, onFilterChange]);

  const handleReset = () => {
    setGradeLevel("All Levels");
    setSession("All Sessions");
  };

  return (
    <div
      className={`bg-yellow-400 p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-4 transform transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-wrap items-center gap-6">
        {/* Grade Level */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-black">Grade Level:</label>
          <div className="relative group">
            <select
              className="px-3 py-2 bg-white text-black text-sm rounded-md border border-gray-300 
                focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-100 
                transition-all duration-200 w-[160px]"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            >
              <option>All Levels</option>
              <option>Pre-Elem</option>
              <option>Kinder</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
            </select>

            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs 
                font-semibold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                transition-all duration-300 whitespace-nowrap"
            >
              Select Grade Level
            </span>
          </div>
        </div>

        {/* Session */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-black">Session:</label>
          <div className="relative group">
            <select
              className="px-3 py-2 bg-white text-black text-sm rounded-md border border-gray-300 
                focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-100 
                transition-all duration-200 w-[160px]"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option>All Sessions</option>
              <option>Morning</option>
              <option>Afternoon</option>
            </select>

            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs 
                font-semibold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                transition-all duration-300 whitespace-nowrap"
            >
              Select Session
            </span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-3 py-2 rounded-md border border-yellow-500
          hover:bg-yellow-100 active:scale-95 transition-all duration-200 ease-out"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Filters
      </button>
    </div>
  );
};

export default ReviewFilter;
