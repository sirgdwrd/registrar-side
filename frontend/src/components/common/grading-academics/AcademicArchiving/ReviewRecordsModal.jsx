import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ReviewRecordsModal = ({ isOpen, onClose, gradeLevel }) => {
  if (!gradeLevel) return null;

  // Mock data for section breakdown
  const sectionData = [
    {
      id: 1,
      section: "Section A (Morning)",
      teacher: "Ms. Maria Santos",
      totalStudents: 15,
      missingSubjects: [
        { subject: "Mathematics", students: 3 },
        { subject: "Science", students: 1 },
      ],
      missingAttendance: 2,
      status: "incomplete",
    },
    {
      id: 2,
      section: "Section B (Afternoon)",
      teacher: "Mr. Juan Cruz",
      totalStudents: 15,
      missingSubjects: [{ subject: "Writing", students: 2 }],
      missingAttendance: 0,
      status: "incomplete",
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    return status === "complete"
      ? `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`
      : `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
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
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Review Incomplete Records
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {gradeLevel.gradeLevel} • {gradeLevel.schoolYear} •{" "}
              {gradeLevel.gradingPeriod}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
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
                <p className="text-amber-800 dark:text-amber-300 font-medium">
                  {gradeLevel.totalStudents - gradeLevel.completeRecords}{" "}
                  records incomplete
                </p>
                <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                  Missing {gradeLevel.missingItems.subjects} subjects and{" "}
                  {gradeLevel.missingItems.attendance} attendance records across
                  all sections.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {sectionData.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 dark:border-slate-600 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {section.section}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {section.teacher} • {section.totalStudents} students
                    </p>
                  </div>
                  <span className={getStatusBadge(section.status)}>
                    {section.status === "complete" ? "Complete" : "Incomplete"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {/* Missing Subjects */}
                  <div>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-500"
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
                      Missing Subjects
                    </h5>
                    {section.missingSubjects.length > 0 ? (
                      <ul className="space-y-1">
                        {section.missingSubjects.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {item.subject} ({item.students} students)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-green-600 dark:text-green-400">
                        All subjects complete
                      </p>
                    )}
                  </div>

                  {/* Missing Attendance */}
                  <div>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-500"
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
                      Missing Attendance
                    </h5>
                    {section.missingAttendance > 0 ? (
                      <p className="text-gray-600 dark:text-gray-400">
                        {section.missingAttendance} students with incomplete
                        attendance
                      </p>
                    ) : (
                      <p className="text-green-600 dark:text-green-400">
                        Attendance complete
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total missing: {section.missingSubjects.length} subjects,{" "}
                    {section.missingAttendance} attendance
                  </p>
                </div>
              </div>
            ))}
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Contact Teachers
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewRecordsModal;
