import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ViewArchiveModal = ({ isOpen, onClose, gradeLevel }) => {
  if (!gradeLevel) return null;

  // Mock archived student records data
  const archivedStudents = [
    {
      id: 1,
      name: "Althea Rodriguez",
      studentId: "2024-00123",
      section: "Section A (Morning)",
      finalAverage: 92.5,
      status: "Promoted",
    },
    {
      id: 2,
      name: "Brandon Cruz",
      studentId: "2024-00124",
      section: "Section A (Morning)",
      finalAverage: 88.0,
      status: "Promoted",
    },
    {
      id: 3,
      name: "Chloe Tan",
      studentId: "2024-00125",
      section: "Section B (Afternoon)",
      finalAverage: 95.2,
      status: "With Honors",
    },
    {
      id: 4,
      name: "Daniel Lim",
      studentId: "2024-00126",
      section: "Section B (Afternoon)",
      finalAverage: 86.7,
      status: "Promoted",
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    switch (status) {
      case "With Honors":
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300`;
      case "Promoted":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`;
      case "Retained":
        return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300`;
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-green-600 dark:text-green-400";
    if (grade >= 85) return "text-blue-600 dark:text-blue-400";
    if (grade >= 80) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
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
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              View Archived Records
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {gradeLevel.gradeLevel} • {gradeLevel.schoolYear} •{" "}
              {gradeLevel.gradingPeriod}
            </p>
          </div>
        </div>

        <div className="mb-6">
          {/* Archive Information */}
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Archive Status
                </p>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✓ Archived
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Last Archived
                </p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {gradeLevel.lastArchived}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {gradeLevel.totalStudents}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Archive Location
                </p>
                <p className="text-gray-800 dark:text-white font-medium">
                  Database
                </p>
              </div>
            </div>
          </div>

          {/* Archived Student Records */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Student Records
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {archivedStudents.length} of {gradeLevel.totalStudents} students
                shown
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Student Name
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Student ID
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Section
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                      Final Average
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                  {archivedStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <td className="px-4 py-2 text-gray-800 dark:text-white font-medium">
                        {student.name}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-white">
                        {student.studentId}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-white">
                        {student.section}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`font-mono font-bold ${getGradeColor(
                            student.finalAverage
                          )}`}
                        >
                          {student.finalAverage}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={getStatusBadge(student.status)}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 mx-auto">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Search and Pagination Note */}
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Archived records are read-only
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Use Archive Viewer tab for full search functionality
              </div>
            </div>
          </div>

          {/* Backend Integration Note */}
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                  <strong>Backend Integration:</strong> This modal should fetch
                  actual archived student records from the database. Include
                  search, filter, and pagination for large datasets.
                </p>
              </div>
            </div>
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open in Archive Viewer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewArchiveModal;
