import React from 'react';

const ActionButtons = ({ selectedCount, onExport, onUpdateHolds }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {selectedCount > 0 ? `${selectedCount} students selected` : 'No students selected'}
      </div>
      <div className="flex gap-3">
        <button 
          className="bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
          onClick={onExport}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export List
        </button>
        
        <button 
          className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onUpdateHolds}
          disabled={selectedCount === 0}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Update Holds ({selectedCount})
        </button>
      </div>
    </div>
  );
};

export default ActionButtons; // Make sure this line exists