import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ArchiveLogModal = ({ isOpen, onClose }) => {
  // Mock archive log data
  const archiveLogs = [
    {
      id: 1,
      date: "2024-06-20",
      gradeLevel: "Grade 4",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      recordsProcessed: 32,
      fileSize: "1.4 MB",
      status: "success",
      archivedBy: "Admin User",
    },
    {
      id: 2,
      date: "2024-06-18",
      gradeLevel: "Grade 6",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      recordsProcessed: 26,
      fileSize: "1.1 MB",
      status: "success",
      archivedBy: "Admin User",
    },
    {
      id: 3,
      date: "2024-06-15",
      gradeLevel: "Grade 2",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      recordsProcessed: 30,
      fileSize: "1.3 MB",
      status: "success",
      archivedBy: "Admin User",
    },
    {
      id: 4,
      date: "2023-06-25",
      gradeLevel: "All Grades",
      schoolYear: "2022-2023",
      gradingPeriod: "Final",
      recordsProcessed: 168,
      fileSize: "7.2 MB",
      status: "success",
      archivedBy: "System Admin",
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    return status === "success"
      ? `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`
      : `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Archive Log History
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            History of all academic record archiving operations.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                    Grade Level
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                    School Year
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                    Period
                  </th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                    Records
                  </th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                    Archived By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                {archiveLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <td className="px-4 py-2 text-gray-800 dark:text-white">
                      {log.date}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white font-medium">
                      {log.gradeLevel}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">
                      {log.schoolYear}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">
                      {log.gradingPeriod}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white text-right">
                      {log.recordsProcessed}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white text-right">
                      {log.fileSize}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={getStatusBadge(log.status)}>
                        {log.status === "success" ? "Success" : "Failed"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">
                      {log.archivedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export Log
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ArchiveLogModal;
