import React, { useState } from "react";
import ViewReportCardModal from "./ViewReportCardModal";

const ReportCardsTable = ({
  reportCards,
  selectedReportCards,
  selectAll,
  onSelectReportCard,
  onSelectAll,
  currentPage,
  totalPages,
  totalReportCards,
  reportCardsPerPage,
  onPageChange,
  onModalAction,
}) => {
  const [selectedReportCard, setSelectedReportCard] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Released":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const handleView = (reportCard) => {
    setSelectedReportCard(reportCard);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedReportCard(null);
  };

  const handleModalAction = (action, data) => {
    if (onModalAction) {
      onModalAction(action, data);
    }
    handleCloseModal();
  };

  const getActionButton = (reportCard) => {
    switch (reportCard.status) {
      case "Ready":
        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleView(reportCard)}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1"
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
          </div>
        );
      case "Released":
        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleView(reportCard)}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1"
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
          </div>
        );
      case "Pending":
        return (
          <div className="flex justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium px-3 py-1 flex items-center gap-1">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Awaiting
            </span>
          </div>
        );
      default:
        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleView(reportCard)}
              className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-1"
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
          </div>
        );
    }
  };

  // Helper to render checkbox or empty cell
  const renderCheckboxCell = (reportCard) => {
    if (reportCard.status === "Released") {
      return <td className="px-4 py-3 text-center">—</td>;
    }

    return (
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={selectedReportCards.includes(reportCard.id)}
          onChange={() => onSelectReportCard(reportCard.id)}
          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
        />
      </td>
    );
  };

  // Pagination helpers
  const startIndex = (currentPage - 1) * reportCardsPerPage + 1;
  const endIndex = Math.min(currentPage * reportCardsPerPage, totalReportCards);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#3C2F2F] dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onSelectAll}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                  Grade & Section
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[80px]">
                  GPA
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                  Release Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {reportCards.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-800 dark:text-white"
                  >
                    No report cards found matching your criteria.
                  </td>
                </tr>
              ) : (
                reportCards.map((reportCard) => (
                  <tr
                    key={reportCard.id}
                    className="hover:bg-amber-50 dark:hover:bg-slate-700"
                  >
                    {renderCheckboxCell(reportCard)}
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                      {reportCard.studentName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {reportCard.gradeLevel} - {reportCard.section}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-mono">
                      {reportCard.gpa.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          reportCard.status
                        )}`}
                      >
                        {reportCard.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {reportCard.releaseDate || "Not released"}
                    </td>
                    <td className="px-4 py-3">{getActionButton(reportCard)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {reportCards.length > 0 && (
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-slate-600">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{startIndex}</span> to{" "}
                  <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{totalReportCards}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="i-tabler-chevron-left mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <div className="i-tabler-chevron-right ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ViewReportCardModal
        reportCard={selectedReportCard}
        isOpen={showViewModal}
        onClose={handleCloseModal}
        onAction={handleModalAction}
      />
    </>
  );
};

export default ReportCardsTable;
