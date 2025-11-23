import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";

const ScreeningHeader = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setAnimate(true);
  }, []);

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Inline keyframes for animation */}
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
        Application Screening and Document Validation
      </h2>

      {/* Button */}
      <div
        className={`flex gap-2 transition-all duration-500 
          ${animate ? "animate-slideInRight" : "opacity-0"}`}
      >
        {/* Print Button with tooltip & hover animation */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 
            rounded-md text-sm font-semibold transition transform duration-200 hover:scale-105 hover:bg-blue-500"
          >
            <Printer className="w-4 h-4" />
            Print Checklist
          </button>

          {/* Tooltip */}
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs font-semibold rounded-md px-2 py-1 
            opacity-0 group-hover:opacity-100 transition-all duration-300 
            whitespace-nowrap z-50"
          >
            Print Selected
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScreeningHeader;
