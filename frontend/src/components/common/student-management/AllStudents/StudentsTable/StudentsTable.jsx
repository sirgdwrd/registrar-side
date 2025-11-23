import React from 'react';

const StudentsTable = ({ students, onViewProfile }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Dropout':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Expelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'Graduated':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Transferred':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-slate-700 mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#3C2F2F] dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Student ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Student Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Grade & Section</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Parent/Guardian</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[130px]">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Enrollment Date</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-800 dark:text-white">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-amber-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-mono">{student.studentId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.gradeLevel} - {student.section}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.parentGuardian}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.contactNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.enrollmentDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onViewProfile(student)}
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
                    >
                      View Profile
                    </button>
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

export default StudentsTable;