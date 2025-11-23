import React, { useEffect, useState } from "react";

const ReviewSectionxFilter = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    setTimeout(() => setShow(true), 50);
  }, []);

  const filters = [
    {
      label: "Payment Method",
      tooltip: "Select Payment Method",
      options: ["All Methods", "Cash", "Installment"],
    },
    {
      label: "Requirements Status",
      tooltip: "Select Requirements Status",
      options: ["All Statuses", "Pending", "Complete", "Incomplete"],
    },
    {
      label: "Student Type",
      tooltip: "Select Student Type",
      options: ["All Types", "New Student", "Transferee", "Returning Student"],
    },
  ];

  return (
    <div
      className={`bg-yellow-400 p-6 rounded-xl space-y-6 transform transition-all duration-500 ease-out ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {/* --- Section Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg text-center p-4">
          <h3 className="text-sm font-semibold mb-1 text-gray-800">
            Grade 1 - Morning
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">12</p>
          <span className="text-xs text-gray-600">/ 15 students</span>
        </div>
        <div className="bg-white rounded-lg text-center p-4">
          <h3 className="text-sm font-semibold mb-1 text-gray-800">
            Grade 1 - Afternoon
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">8</p>
          <span className="text-xs text-gray-600">/ 15 students</span>
        </div>
        <div className="bg-white rounded-lg text-center p-4">
          <h3 className="text-sm font-semibold mb-1 text-gray-800">
            Grade 2 - Morning
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">14</p>
          <span className="text-xs text-gray-600">/ 15 students</span>
        </div>
        <div className="bg-white rounded-lg text-center p-4">
          <h3 className="text-sm font-semibold mb-1 text-gray-800">
            Grade 2 - Afternoon
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">10</p>
          <span className="text-xs text-gray-600">/ 15 students</span>
        </div>
      </div>

      {/* --- Filters Row --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 items-center">
        {filters.map((filter) => (
          <div key={filter.label} className="inline-flex items-center relative">
            <label className="text-sm font-semibold text-gray-800 mr-1">
              {filter.label}:
            </label>

            <div className="relative">
              <select
                className="peer px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 text-sm
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer
                  transition-colors duration-200 hover:bg-gray-100 w-full"
              >
                {filter.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              {/* Tooltip appears only when hovering the select */}
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

        {/* Add Section Button */}
        <button className="w-full bg-white text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-100 transition">
          + Add New Section
        </button>
      </div>
    </div>
  );
};

export default ReviewSectionxFilter;
