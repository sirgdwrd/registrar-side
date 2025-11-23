import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const InboxFilter = ({ filtersState, setFiltersState }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the pop-up animation after mount
    setTimeout(() => setShow(true), 50);
  }, []);

  // Define your filter options
  const filters = [
    {
      label: "Student Type",
      tooltip: "Select Student Type",
      options: ["All Types", "New Student", "Transferee", "Returnee"],
    },
    {
      label: "Date Submitted",
      tooltip: "Select Date Submitted",
      options: [
        "All Dates",
        "January 2025",
        "February 2025",
        "March 2025",
        "April 2025",
        "May 2025",
        "November 2025",
      ],
    },
    {
      label: "Grade Level",
      tooltip: "Select Grade Level",
      options: [
        "All Grades",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
      ],
    },
  ];

  // Handle filter change
  const handleChange = (label, value) => {
    setFiltersState({ ...filtersState, [label]: value });
  };

  // Handle clearing all filters
  const handleClearFilters = () => {
    setFiltersState({
      "Student Type": "All Types",
      "Date Submitted": "All Dates",
      "Grade Level": "All Grades",
    });
  };

  return (
    <div
      className={`bg-yellow-400 p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-4 transform transition-all duration-500 ease-out ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-wrap items-center gap-6">
        {filters.map((filter) => (
          <div key={filter.label} className="flex items-center gap-2 relative">
            <label className="text-sm font-semibold text-black">
              {filter.label}:
            </label>
            <div className="relative group">
              <select
                value={filtersState[filter.label] || filter.options[0]}
                onChange={(e) => handleChange(filter.label, e.target.value)}
                className="px-3 py-2 bg-white text-black text-sm rounded-md border border-gray-300 
                  focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-100 
                  transition-all duration-200 w-[160px]"
              >
                {filter.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              {/* Tooltip */}
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  bg-black text-white text-xs font-semibold rounded-md px-2 py-1
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out whitespace-nowrap z-10"
              >
                {filter.tooltip}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={handleClearFilters}
        className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-3 py-2 rounded-md border border-yellow-500
          hover:bg-yellow-100 active:scale-95 transition-all duration-200 ease-out"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Filters
      </button>
    </div>
  );
};

export default InboxFilter;
