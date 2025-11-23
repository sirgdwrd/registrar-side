import React from 'react';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const gradingPeriods = ['Q1', 'Q2', 'Q3', 'Q4', 'Final'];
  const gradeLevels = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  const statuses = ['Pending', 'Submitted', 'Approved', 'Rejected'];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Grading Period Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
            Grading Period
          </label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.gradingPeriod}
            onChange={(e) => onFilterChange({...filters, gradingPeriod: e.target.value})}
          >
            <option value="">All Periods</option>
            {gradingPeriods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>

        {/* Grade Level Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
            Grade Level
          </label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.gradeLevel}
            onChange={(e) => onFilterChange({...filters, gradeLevel: e.target.value})}
          >
            <option value="">All Grades</option>
            {gradeLevels.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
            Status
          </label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.status}
            onChange={(e) => onFilterChange({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button 
            className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white px-4 py-2 rounded transition-colors"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;