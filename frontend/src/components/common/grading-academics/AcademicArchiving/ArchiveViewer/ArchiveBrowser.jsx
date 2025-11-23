import React from "react";

const ArchiveBrowser = ({ archives, onViewArchive, onDownload }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-slate-700">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#3C2F2F] dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                Grade Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                School Year
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[80px]">
                Period
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                Archive Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">
                Students
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[80px]">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                Archived By
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {archives.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-800 dark:text-white"
                >
                  No archived records found matching your criteria.
                </td>
              </tr>
            ) : (
              archives.map((archive) => (
                <tr
                  key={archive.id}
                  className="hover:bg-amber-50 dark:hover:bg-slate-700"
                >
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                    {archive.gradeLevel}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                    {archive.schoolYear}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                    {archive.gradingPeriod}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {archive.archiveDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center">
                    {archive.totalStudents}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white text-center font-mono">
                    {archive.fileSize}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                    {archive.archivedBy}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onViewArchive(archive)}
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
                      <button
                        onClick={() => onDownload(archive)}
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchiveBrowser;
