import React, { useState } from 'react';
import GradeReviewModal from '../GradeReviewModal';
import ViewApprovedModal from '../ViewApprovedModal';
import SuccessToast from '../../../../ui/SuccessToast';

const GradesTable = ({ submissions, selectedSubmissions, selectAll, onSelectSubmission, onSelectAll }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleReview = (submission) => {
    setSelectedSubmission(submission);
    setShowReviewModal(true);
  };

  const handleViewApproved = (submission) => {
    setSelectedSubmission(submission);
    setShowViewModal(true);
  };

  const handleCloseModals = () => {
    setShowReviewModal(false);
    setShowViewModal(false);
    setSelectedSubmission(null);
  };

  const handleModalAction = (action, data) => {
    console.log(`${action} action:`, data);
    
    if (action === 'approve') {
      setToastMessage(`Grades for ${data.teacher} - ${data.subject} approved successfully!`);
      setToastType('success');
    } else if (action === 'flag') {
      setToastMessage(`Grade submission flagged for review. Teacher has been notified.`);
      setToastType('warning');
    }
    setShowToast(true);
    
    setShowReviewModal(false);
    setSelectedSubmission(null);
  };

  const getActionButton = (submission) => {
    switch (submission.status) {
      case 'Submitted':
        return (
          <button
            onClick={() => handleReview(submission)}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
          >
            Review
          </button>
        );
      case 'Approved':
        return (
          <button
            onClick={() => handleViewApproved(submission)}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
          >
            View
          </button>
        );
      case 'Pending':
        return (
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium px-3 py-1">
            Awaiting
          </span>
        );
      case 'Rejected':
        return (
          <button
            onClick={() => handleReview(submission)}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
          >
            Re-review
          </button>
        );
      default:
        return (
          <button
            onClick={() => handleViewApproved(submission)}
            className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm"
          >
            View
          </button>
        );
    }
  };

  // Helper to render checkbox or empty cell
  const renderCheckboxCell = (submission) => {
    if (submission.status === 'Approved') {
      return <td className="px-4 py-3 text-center">—</td>;
    }
    
    return (
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={selectedSubmissions.includes(submission.id)}
          onChange={() => onSelectSubmission(submission.id)}
          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
        />
      </td>
    );
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
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[150px]">Teacher</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Grade & Section</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Students</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Enrollment Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-800 dark:text-white">
                    No grade submissions found matching your criteria.
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-amber-50 dark:hover:bg-slate-700">
                    {renderCheckboxCell(submission)}
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">{submission.teacher}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{submission.subject}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{submission.gradeLevel} - {submission.section}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{submission.studentCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{submission.enrollmentDate}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(submission.status)}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getActionButton(submission)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <GradeReviewModal
        submission={selectedSubmission}
        isOpen={showReviewModal}
        onClose={handleCloseModals}
        onAction={handleModalAction}
      />

      <ViewApprovedModal
        submission={selectedSubmission}
        isOpen={showViewModal}
        onClose={handleCloseModals}
      />

      <SuccessToast
        isVisible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default GradesTable;