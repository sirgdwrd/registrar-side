import React, { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

const Financial = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animation once the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`relative group flex justify-between items-center 
        bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 
        rounded-lg p-4 shadow-md flex-1 min-w-[220px] cursor-pointer 
        transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-100`}
    >
      <div className="flex flex-col">
        <span className="text-black dark:text-white text-sm font-semibold">
          Financial Holds
        </span>
        <span className="text-black dark:text-white text-2xl font-extrabold">
          2
        </span>
      </div>

      <div className="w-11 h-11 rounded-lg flex items-center justify-center
        bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner">
        <CreditCard size={26} />
      </div>

      {/* Tooltip with smoother animation */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        bg-gray-900 text-white text-xs font-semibold rounded-md px-2 py-1
        opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-500 ease-out whitespace-nowrap z-10">
        View Financial Holds
      </div>
    </div>
  );
};

export default Financial;
