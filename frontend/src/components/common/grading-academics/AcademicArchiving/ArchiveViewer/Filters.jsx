import React from "react";

const Filters = ({ filters, onFilterChange, archivedRecords }) => {
  // Get unique values from archived records
  const schoolYears = [
    ...new Set(archivedRecords.map((record) => record.schoolYear)),
  ];
  const gradeLevels = [
    ...new Set(archivedRecords.map((record) => record.gradeLevel)),
  ];
  const archiveDates = [
    ...new Set(archivedRecords.map((record) => record.archiveDate)),
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
            <option value="">All School Years</option>
            {schoolYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Grade Level Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grade Level
          </label>
          <select
            value={filters.gradeLevel}
            onChange={(e) =>
              onFilterChange({ ...filters, gradeLevel: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Grade Levels</option>
            {gradeLevels.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Archive Date Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Archive Date
          </label>
          <select
            value={filters.archiveDate}
            onChange={(e) =>
              onFilterChange({ ...filters, archiveDate: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Dates</option>
            {archiveDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {archivedRecords.length} archived records
        </p>
      </div>
    </div>
  );
};

export default Filters;
