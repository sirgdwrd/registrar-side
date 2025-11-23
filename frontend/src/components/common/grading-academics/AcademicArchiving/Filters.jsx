import React from "react";

const Filters = ({ filters, onFilterChange }) => {
  const schoolYears = ["2023-2024", "2022-2023", "2021-2022"];
  const gradingPeriods = ["Q1", "Q2", "Q3", "Q4", "Final"];
  const archiveStatuses = [
    { value: "all", label: "All Status" },
    { value: "ready", label: "Ready" },
    { value: "incomplete", label: "Incomplete" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* School Year Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            School Year
          </label>
          <select
            value={filters.schoolYear}
            onChange={(e) =>
              onFilterChange({ ...filters, schoolYear: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {schoolYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Grading Period Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grading Period
          </label>
          <select
            value={filters.gradingPeriod}
            onChange={(e) =>
              onFilterChange({ ...filters, gradingPeriod: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {gradingPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {/* Archive Status Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Archive Status
          </label>
          <select
            value={filters.archiveStatus}
            onChange={(e) =>
              onFilterChange({ ...filters, archiveStatus: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {archiveStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
