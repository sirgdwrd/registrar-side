import React from "react";
import Modal from "../../../../ui/Modal";
import Button from "../../../../ui/Button";

const ViewArchiveModal = ({ isOpen, onClose, archive }) => {
  if (!archive) return null;

  // Mock student records for the archive
  const studentRecords = [
    {
      id: 1,
      name: "Althea Rodriguez",
      gradeLevel: "Grade 4",
      section: "Section A",
      status: "Archived",
    },
    {
      id: 2,
      name: "Brandon Cruz",
      gradeLevel: "Grade 4",
      section: "Section A",
      status: "Archived",
    },
    {
      id: 3,
      name: "Chloe Tan",
      gradeLevel: "Grade 4",
      section: "Section B",
      status: "Archived",
    },
    {
      id: 4,
      name: "Daniel Lim",
      gradeLevel: "Grade 4",
      section: "Section B",
      status: "Archived",
    },
  ];

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
              {archive.gradeLevel} • {archive.schoolYear} •{" "}
              {archive.gradingPeriod}
            </p>
          </div>
        </div>

        <div className="mb-6">
          {/* Archive Summary */}
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Grade Level</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {archive.gradeLevel}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">School Year</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {archive.schoolYear}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Archive Date</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {archive.archiveDate}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">File Size</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {archive.fileSize}
                </p>
              </div>
            </div>
          </div>

          {/* Student Records */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
              Student Records ({archive.totalStudents} students)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Student Name
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Grade Level
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                      Section
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                  {studentRecords.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <td className="px-4 py-2 text-gray-800 dark:text-white">
                        {student.name}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-white">
                        {student.gradeLevel}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-white">
                        {student.section}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Note */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing 4 of {archive.totalStudents} student records
              </p>
            </div>
          </div>

          {/* Backend Note */}
          <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <p className="text-amber-800 dark:text-amber-300 text-sm">
                  <strong>Backend Integration Required:</strong> This preview
                  shows sample data. Backend should provide actual archived
                  student records with search and pagination functionality.
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Archive
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewArchiveModal;
