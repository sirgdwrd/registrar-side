import React from "react";

const ArchiveTable = ({
  gradeLevels,
  selectedGrades,
  selectAll,
  onSelectGrade,
  onSelectAll,
  onArchive,
  onReview,
  onView,
  isProcessing, // NEW: Processing state
}) => {
  const getStatusBadge = (status, missingItems) => {
    const baseClasses =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";

    switch (status) {
      case "ready":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`;
      case "incomplete":
        return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`;
      case "archived":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300`;
    }
  };

  const getStatusText = (status, missingItems) => {
    switch (status) {
      case "ready":
        return "Ready";
      case "incomplete":
        const totalMissing = missingItems.subjects + missingItems.attendance;
        return `${totalMissing} pending`;
      case "archived":
        return "Archived";
      default:
        return "Unknown";
    }
  };

  const getMissingItemsText = (missingItems) => {
    const parts = [];
    if (missingItems.subjects > 0) {
      parts.push(`${missingItems.subjects} subjects`);
    }
    if (missingItems.attendance > 0) {
      parts.push(`${missingItems.attendance} attendance`);
    }
    return parts.length > 0 ? parts.join(", ") : "Complete";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-slate-700">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#3C2F2F] dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  disabled={isProcessing} // NEW: Disable during processing
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                Grade Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                Grading Period
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                Total Students
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                Complete Records
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[140px]">
                Missing Items
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                Last Archived
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {gradeLevels.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-6 text-center text-gray-800 dark:text-white"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500"></div>
                      <span>Processing archives...</span>
                    </div>
                  ) : (
                    "No grade levels found matching your criteria."
                  )}
                </td>
              </tr>
            ) : (
              gradeLevels.map((grade) => (
                <tr
                  key={grade.id}
                  className={`hover:bg-amber-50 dark:hover:bg-slate-700 ${
                    isProcessing ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedGrades.includes(grade.id)}
                      onChange={() => onSelectGrade(grade.id)}
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                      disabled={isProcessing || grade.status === "archived"} // NEW: Disable during processing
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                    {grade.gradeLevel}
                    {isProcessing && selectedGrades.includes(grade.id) && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-500"></div>
                        <span className="text-xs text-green-600 dark:text-green-400">
                          Archiving...
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                    {grade.gradingPeriod}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {grade.totalStudents}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {grade.completeRecords}/{grade.totalStudents}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {getMissingItemsText(grade.missingItems)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {grade.lastArchived}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={getStatusBadge(
                        grade.status,
                        grade.missingItems
                      )}
                    >
                      {getStatusText(grade.status, grade.missingItems)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      {grade.status === "ready" && (
                        <button
                          onClick={() => onArchive(grade)}
                          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isProcessing} // NEW: Disable during processing
                        >
                          {isProcessing && selectedGrades.includes(grade.id) ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              Processing
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3"
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
                              Archive
                            </>
                          )}
                        </button>
                      )}
                      {grade.status === "incomplete" && (
                        <button
                          onClick={() => onReview(grade)}
                          className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isProcessing} // NEW: Disable during processing
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Review
                        </button>
                      )}
                      {grade.status === "archived" && (
                        <button
                          onClick={() => onView(grade)}
                          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isProcessing} // NEW: Disable during processing
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Archiving in Progress
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please wait while records are being archived...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchiveTable;
