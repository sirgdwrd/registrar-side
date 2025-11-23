import React from "react";

const ActionButtons = ({
  selectedCount,
  onBulkPrint,
  onBulkRelease,
  onBulkReleaseConfirmation, // Add this new prop
}) => {
  const handleBulkRelease = () => {
    // Instead of calling onBulkRelease directly, trigger confirmation
    onBulkReleaseConfirmation(selectedCount);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {selectedCount > 0 ? (
          <span>{selectedCount} report cards selected for release</span>
        ) : (
          <span>Select report cards to release</span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#3C2F2F] hover:bg-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onBulkPrint}
          disabled={selectedCount === 0}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 
0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Bulk Print
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBulkRelease} // Use the new handler
          disabled={selectedCount === 0}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Release to Parents
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
