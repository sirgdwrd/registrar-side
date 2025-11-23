import React, { useState } from 'react';
import { usePagination } from './usePagination';
import Pagination from './Pagination';
import OTCConfirmationModal from '../OTCConfirmationModal';
import EnrollmentConfirmationModal from '../EnrollmentConfirmationModal';
import StudentIDAssignmentModal from '../StudentIDAssignmentModal';
import SuccessToast from '../../../../ui/SuccessToast';
import OnlineVerificationModal from '../OnlineVerificationModal';
import FlagIssueModal from '../FlagIssueModal';

const StudentsTable = ({ 
  students = [], 
  selectedStudents = [], 
  selectAll = false, 
  onSelectAll = () => {}, 
  onStudentSelect = () => {} 
}) => {
  const [localSelectAll, setLocalSelectAll] = useState(false);
  
  // Modal states for the flow
  const [otcModalOpen, setOtcModalOpen] = useState(false);
  const [enrollmentConfirmModalOpen, setEnrollmentConfirmModalOpen] = useState(false);
  const [studentIdModalOpen, setStudentIdModalOpen] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [otcData, setOtcData] = useState(null);

  // Use pagination hook
  const {
    currentData: paginatedStudents,
    currentPage,
    totalPages,
    goToPage,
    itemsPerPage,
    totalItems,
    startIndex,
    endIndex
  } = usePagination(students, 50);

  // Handle select all
  const handleSelectAll = () => {
    const newSelectAll = !localSelectAll;
    setLocalSelectAll(newSelectAll);
    if (newSelectAll) {
      onSelectAll(paginatedStudents.map(student => student.id));
    } else {
      onSelectAll([]);
    }
  };

  // Handle individual student selection
  const handleStudentSelect = (studentId) => {
    onStudentSelect(studentId);
  };

  // Step 1: Open OTC modal
  const handleConfirmPayment = (student) => {
    setSelectedStudent(student);
    setOtcModalOpen(true);
  };

  // Step 2: OTC modal confirms payment, show enrollment confirmation
  const handleOTCConfirmed = (otcConfirmationData) => {
    setOtcData(otcConfirmationData);
    setOtcModalOpen(false);
    setEnrollmentConfirmModalOpen(true);
  };

  // Step 3: Enrollment confirmed, show Student ID assignment
  const handleEnrollmentConfirmed = () => {
    setEnrollmentConfirmModalOpen(false);
    setStudentIdModalOpen(true);
  };

  // Step 4: Student ID assigned, show success toast
const handleStudentIDAssigned = (studentID) => {
  console.log('Student ID assigned:', {
    student: selectedStudent,
    otcData: otcData,
    studentID: studentID
  });
  
  setStudentIdModalOpen(false);
  
  // Set success message for enrollment
  setToastMessage("Student enrollment completed successfully! Account details have been sent to the parent/guardian's email.");
  setToastType('success');
  setSuccessToastVisible(true);
  
  // Reset the flow
  setTimeout(() => {
    setSelectedStudent(null);
    setOtcData(null);
  }, 100);
};

    // Handle online payment verification
  const handleVerifyPayment = (student) => {
    setSelectedStudent(student);
    setOnlineVerificationModalOpen(true);
  };

  const getPaymentDetails = (student) => {
    if (student.paymentMethod === 'OTC') {
      return `Scheduled: ${student.scheduledDate}`;
    } else {
      return `Ref: ${student.referenceNumber}`;
    }
  };

const getStatusBadge = (status) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'Payment Pending': // Add this case
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

  const [onlineVerificationModalOpen, setOnlineVerificationModalOpen] = useState(false);

  const handleOnlineVerificationConfirmed = (verificationData) => {
  console.log('Online payment verified:', verificationData);
  setOnlineVerificationModalOpen(false);
  // Continue with the same enrollment flow as OTC
  setEnrollmentConfirmModalOpen(true);
};

const [flagIssueModalOpen, setFlagIssueModalOpen] = useState(false);

const handleIssueFlagged = (issueData) => {
  console.log('Payment issue flagged:', issueData);
  setFlagIssueModalOpen(false);
  
  // Set warning message for flagged issues
  setToastMessage("Payment issue flagged successfully. Enrollment paused - you can follow up on this from the main dashboard.");
  setToastType('warning');
  setSuccessToastVisible(true);
  
  // Reset selected student
  setTimeout(() => {
    setSelectedStudent(null);
  }, 100);
};

const [toastType, setToastType] = useState('success');
const [toastMessage, setToastMessage] = useState('');

  return (
    <>
      {/* Table Container with Responsive Scroll */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-slate-700">
        {/* Horizontal scroll container */}
        <div className="overflow-x-auto">
          {/* Table with min-width to ensure proper sizing */}
          <table className="min-w-full table-auto">
            <thead className="bg-[#3C2F2F] dark:bg-slate-700">
              <tr>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider sticky left-0 bg-[#3C2F2F] dark:bg-slate-700 z-10">
                  <input
                    type="checkbox"
                    checked={localSelectAll}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-slate-800"
                    aria-label="select all"
                  />
                </th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Name</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Grade</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Payment Method</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Amount</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Payment Details</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Date Added</th>{/* 
                */}<th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Status</th>{/* 
                */}<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Actions</th>{/* 
              */}</tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-800 dark:text-white">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-amber-50 dark:hover:bg-slate-700">
                    <td className="px-4 py-3 sticky left-0 bg-white dark:bg-slate-800 z-5">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelect(student.id)}
                        className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-slate-800"
                        aria-label={`select-${student.id}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium min-w-[150px]">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white min-w-[100px]">{student.gradeLevel}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white min-w-[120px]">{student.paymentMethod}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white min-w-[100px]">₱{student.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white min-w-[150px]">
                      {getPaymentDetails(student)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white min-w-[120px]">
                      {student.dateAdded}
                    </td>
                    <td className="px-4 py-3 min-w-[120px] text-center"> {/* Added text-center */}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium min-w-[120px]">
                      {student.paymentMethod === 'OTC' ? (
                        <button
                          onClick={() => handleConfirmPayment(student)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          Confirm Payment
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerifyPayment(student)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          Verify Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>

      {/* OTC Confirmation Modal */}
      <OTCConfirmationModal
        student={selectedStudent}
        isOpen={otcModalOpen}
        onClose={() => setOtcModalOpen(false)}
        onEnrollmentConfirm={handleOTCConfirmed}
      />

      {/* Enrollment Confirmation Modal */}
      <EnrollmentConfirmationModal
        student={selectedStudent}
        isOpen={enrollmentConfirmModalOpen}
        onClose={() => setEnrollmentConfirmModalOpen(false)}
        onConfirm={handleEnrollmentConfirmed}
      />

      {/* Student ID Assignment Modal */}
      <StudentIDAssignmentModal
        student={selectedStudent}
        isOpen={studentIdModalOpen}
        onClose={() => setStudentIdModalOpen(false)}
        onConfirm={handleStudentIDAssigned}
      />

      {/* Success Toast */}
      <SuccessToast
        isVisible={successToastVisible}
        message={toastMessage}
        type={toastType}
        onClose={() => setSuccessToastVisible(false)}
      />

      <OnlineVerificationModal
        student={selectedStudent}
        isOpen={onlineVerificationModalOpen}
        onClose={() => setOnlineVerificationModalOpen(false)}
        onVerificationConfirm={handleOnlineVerificationConfirmed}
        onFlagIssue={() => {
          setOnlineVerificationModalOpen(false);
          setFlagIssueModalOpen(true);
        }}
      />

      <FlagIssueModal
        student={selectedStudent}
        isOpen={flagIssueModalOpen}
        onClose={() => setFlagIssueModalOpen(false)}
        onIssueFlagged={handleIssueFlagged}
      />
    </>
  );
};

export default StudentsTable;