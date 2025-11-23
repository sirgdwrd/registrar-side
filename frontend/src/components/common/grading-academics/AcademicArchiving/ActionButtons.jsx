import React from "react";

const ActionButtons = ({
  selectedCount,
  onViewArchiveLog,
  onBulkArchive,
  isProcessing,
}) => {
  const readyGradesSelected = selectedCount > 0 && !isProcessing;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isProcessing ? (
          <span className="text-amber-600 dark:text-amber-400">
            ⏳ Archiving in progress...
          </span>
        ) : selectedCount > 0 ? (
          <span>{selectedCount} grade level(s) selected for archiving</span>
        ) : (
          <span>Select grade levels to archive</span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onViewArchiveLog}
          disabled={isProcessing}
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          View Archive Log
        </button>

        <button
          className={`${
            readyGradesSelected
              ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          } text-white px-4 py-2 rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={onBulkArchive}
          disabled={!readyGradesSelected || isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Archive Selected ({selectedCount})
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
