import React from 'react';

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Payment Method</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
            value={filters.paymentMethod}
            onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
          >
            <option value="">All Methods</option>
            <option value="OTC">OTC</option>
            <option value="GCash">GCash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Payment Status</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
            value={filters.paymentStatus}
            onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
          >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Verify Payment">Verify Payment</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">Grade Level</label>
          <select 
            className="w-full border border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
            value={filters.gradeLevel}
            onChange={(e) => setFilters({...filters, gradeLevel: e.target.value})}
          >
            <option value="">All Grades</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>

        <div className="flex items-end">
          <button 
            className="w-full bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors"
            onClick={() => setFilters({ paymentMethod: '', paymentStatus: '', gradeLevel: '' })}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;