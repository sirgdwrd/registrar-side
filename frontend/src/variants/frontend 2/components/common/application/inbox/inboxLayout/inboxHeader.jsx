import React, { useEffect, useState } from "react";
import { FileDown, CheckCircle } from "lucide-react";

const InboxHeader = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setAnimate(true);
  }, []);

  return (
    <div className="flex items-center justify-between mb-4 relative">
      {/* Inline keyframes for both directions */}
      <style>
        {`
          @keyframes slideInLeft {
            0% {
              transform: translateX(-30px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            0% {
              transform: translateX(30px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out forwards;
          }
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out forwards;
          }
        `}
      </style>

      {/* Title */}
      <h2
        className={`text-xl font-bold text-black dark:text-white transition-all duration-500 
          ${animate ? "animate-slideInLeft" : "opacity-0"}`}
      >
        Pending Applications for Validation
      </h2>

      {/* Buttons */}
      <div
        className={`flex gap-2 transition-all duration-500 
          ${animate ? "animate-slideInRight" : "opacity-0"}`}
      >
        {/* Export Button with tooltip */}
        <div className="relative group">
          <button className="flex items-center gap-2 border border-gray-300 dark:border-slate-600 
            text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold 
            transition transform duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-slate-700">
            <FileDown className="w-4 h-4" />
            Export
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs font-semibold rounded-md px-2 py-1 
            opacity-0 group-hover:opacity-100 transition-all duration-300 
            whitespace-nowrap z-50">
            Export all pending applications
          </span>
        </div>

        {/* Validate Button with tooltip */}
        <div className="relative group">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 
            rounded-md text-sm font-semibold transition transform duration-200 hover:scale-105 hover:bg-blue-500">
            <CheckCircle className="w-4 h-4" />
            Validate Selected
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs font-semibold rounded-md px-2 py-1 
            opacity-0 group-hover:opacity-100 transition-all duration-300 
            whitespace-nowrap z-50">
            Validate selected applications
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
