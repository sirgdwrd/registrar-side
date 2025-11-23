import React, { useEffect, useState } from "react";
import { RotateCcw, CheckCheck } from "lucide-react";

const ReviewHeader = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  return (
    <div className="flex items-center justify-between mb-4 overflow-visible">
      {/* Title - slides in from left */}
      <h2
        className={`text-xl font-bold text-black dark:text-white transform transition-all duration-700 ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        Section Assignment and Final Acceptance
      </h2>

      {/* Buttons - slide in from right */}
      <div
        className={`flex gap-2 transform transition-all duration-700 delay-100 ${
          animate ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        {/* Reset Button */}
        <div className="relative">
          <button className="flex items-center gap-2 border border-gray-300 dark:border-slate-600 
            text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold 
            transition transform duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-slate-700 group">
            <RotateCcw className="w-4 h-4" />
            Reset Sections
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 
              bg-black text-white text-xs font-semibold rounded-md px-2 py-1 
              opacity-0 group-hover:opacity-100 transition-all duration-300 
              whitespace-nowrap z-50 pointer-events-none">
              Reset Student Section
            </span>
          </button>
        </div>

        {/* Accept Button */}
        <div className="relative">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 
            rounded-md text-sm font-semibold transition transform duration-200 hover:scale-105 hover:bg-blue-500 group">
            <CheckCheck className="w-4 h-4" />
            Accept All Qualified
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 
              bg-black text-white text-xs font-semibold rounded-md px-2 py-1 
              opacity-0 group-hover:opacity-100 transition-all duration-300 
              whitespace-nowrap z-50 pointer-events-none">
              Enroll Qualified Students
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
