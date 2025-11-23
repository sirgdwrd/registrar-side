import React from 'react';

const SearchFilters = ({ 
  searchTerm, 
  filters, 
  onSearchChange, 
  onFilterChange, 
  onClearFilters,
  students 
}) => {
  const statusOptions = [...new Set(students.map(s => s.status))];
  const gradeLevels = [...new Set(students.map(s => s.gradeLevel))];
  const sections = [...new Set(students.map(s => s.section))];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
            Search Students
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by ID, name, parent, or contact..."
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Status</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.status}
            onChange={(e) => onFilterChange({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Grade Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Grade Level</label>
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

        {/* Section Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Section</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.section}
            onChange={(e) => onFilterChange({...filters, section: e.target.value})}
          >
            <option value="">All Sections</option>
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button 
            className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white px-4 py-2 rounded transition-colors"
            onClick={onClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;