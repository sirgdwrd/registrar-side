import React from 'react';

const SectionFilters = ({ 
  filters, 
  setFilters, 
  gradeLevels, 
  sectionsList, 
  teachers, 
  clearFilters 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Grade Level</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.gradeLevel}
            onChange={(e) => setFilters({...filters, gradeLevel: e.target.value})}
          >
            <option value="">All Grades</option>
            {gradeLevels.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Section</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.section}
            onChange={(e) => setFilters({...filters, section: e.target.value})}
          >
            <option value="">All Sections</option>
            {sectionsList.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Advisory Teacher</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
            value={filters.advisoryTeacher}
            onChange={(e) => setFilters({...filters, advisoryTeacher: e.target.value})}
          >
            <option value="">All Teachers</option>
            {teachers.map(teacher => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button 
            className="w-full bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionFilters;