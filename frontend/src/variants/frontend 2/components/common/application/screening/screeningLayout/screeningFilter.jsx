import React, { useEffect, useState } from "react";

const ScreeningFilter = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the pop-up animation after mount
    setTimeout(() => setShow(true), 50);
  }, []);

  const filters = [
    {
      label: "Document Status",
      tooltip: "Select Document Status",
      options: ["All Status", "All Received", "2 Requested", "1 Missing"],
    },
    {
      label: "Student Type",
      tooltip: "Select Student Type",
      options: ["All Types", "New Student", "Transferee", "Returning Student"],
    },
  ];

  return (
    <div
      className={`bg-yellow-400 rounded-md p-4 flex flex-wrap gap-4 transform transition-all duration-500 ease-out ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {filters.map((filter) => (
        <div key={filter.label} className="inline-flex items-center relative">
          <label className="text-sm font-semibold text-black mr-1">
            {filter.label}:
          </label>

          <div className="relative">
            <select
              className="peer px-3 py-2 bg-white text-black rounded-md border border-gray-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer
                transition-colors duration-200 hover:bg-gray-100 w-[160px]"
            >
              {filter.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            {/* Tooltip shows only when hovering the select */}
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                bg-black text-white text-xs font-semibold rounded-md px-2 py-1
                opacity-0 scale-0 peer-hover:opacity-100 peer-hover:scale-100
                transition-all duration-300 ease-in-out whitespace-nowrap z-10"
            >
              {filter.tooltip}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScreeningFilter;
