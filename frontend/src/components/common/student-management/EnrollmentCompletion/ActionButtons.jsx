import React from 'react';

const ActionButtons = ({ 
  selectedCount, 
  totalCount, 
  onExport, 
  onCompleteSelected 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button 
          className="bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded mr-2 transition-colors"
          onClick={onExport}
        >
          Export List
        </button>
        <button 
          className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={onCompleteSelected}
          disabled={selectedCount === 0}
        >
          Complete Selected ({selectedCount})
        </button>
      </div>
      <div className="text-sm text-gray-800 dark:text-white">
        Showing {totalCount} students
      </div>
    </div>
  );
};

export default ActionButtons;