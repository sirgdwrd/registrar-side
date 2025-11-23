import React from 'react';

const ActionBar = ({ filteredCount, totalCount }) => {
  const handleExport = () => {
    alert(`Exporting ${filteredCount} students to Excel file with all columns.`);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredCount} of {totalCount} students
      </div>
      <button 
        className="bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
        onClick={handleExport}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export to Excel
      </button>
    </div>
  );
};

export default ActionBar;