import React from 'react';

const ActionButtons = ({ selectedCount, onExport, onApproveAll }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {selectedCount > 0 ? (
          <span>{selectedCount} submissions selected for approval</span>
        ) : (
          <span>Select submissions to approve</span>
        )}
      </div>
      <div className="flex gap-3">
        <button 
          className="bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
          onClick={onExport}
        >
          <div className="i-tabler-download text-lg" />
          Export Grades
        </button>
        
        <button 
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onApproveAll}
          disabled={selectedCount === 0}
        >
          <div className="i-tabler-check text-lg" />
          Approve All Selected
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;