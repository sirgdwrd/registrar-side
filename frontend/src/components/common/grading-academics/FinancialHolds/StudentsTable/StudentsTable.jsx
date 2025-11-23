import React, { useState } from 'react';
import FinancialHoldModal from '../FinancialHoldModal';

const StudentsTable = ({ 
  students, 
  selectedStudents, 
  selectAll, 
  onSelectStudent, 
  onSelectAll,
  onViewProfile  // Make sure this prop is received
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);


  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Cleared':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleViewDetails = (student) => {
    if (onViewProfile) {
      onViewProfile(student);
    } else {
      // Fallback: handle locally
      setSelectedStudent(student);
    }
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

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
                </th><th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Student ID</th><th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Student Name</th><th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Grade & Section</th><th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[130px]">Outstanding Balance</th><th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Exam Period</th><th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Hold Status</th><th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-800 dark:text-white">
                    No students found with financial holds matching your criteria.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-amber-50 dark:hover:bg-slate-700">
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => onSelectStudent(student.id)}
                        className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-mono">{student.studentId}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.gradeLevel} - {student.section}</td>
                    <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400 font-semibold">{student.outstandingBalance}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{student.examPeriod}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(student.holdStatus)}`}>
                        {student.holdStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewDetails(student)}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Only show local modal if onViewProfile is not provided */}
      {!onViewProfile && (
        <FinancialHoldModal
          student={selectedStudent}
          isOpen={!!selectedStudent}
          onClose={handleCloseModal}
          onActionComplete={(message, type) => {
            console.log('Local onActionComplete called:', message, type);
            // Handle local toast here if needed
          }}
        />
      )}
    </>
  );
};

export default StudentsTable;