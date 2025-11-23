import React, { useState } from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';
import ApproveConfirmationModal from './ApproveConfirmationModal';
import FlagIssueModal from './FlagIssueModal';
import FlagConfirmationModal from './FlagConfirmationModal';
import SubmissionDetails from './SubmissionDetails';
import FileAttachments from './FileAttachments';

const GradeReviewModal = ({ submission, isOpen, onClose, onAction }) => {
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showFlagConfirmModal, setShowFlagConfirmModal] = useState(false);
  const [flagData, setFlagData] = useState(null);

  if (!submission) return null;

  // Check if this is a re-review of previously rejected submission
  const isReReview = submission.status === 'Rejected';

  const handleConfirmApprove = () => {
    setShowApproveModal(false);
    onClose();
    onAction('approve', submission);
  };

  const handleFlagSubmit = (flagFormData) => {
    setFlagData(flagFormData);
    setShowFlagModal(false);
    setShowFlagConfirmModal(true);
  };

  const handleConfirmFlag = (finalFlagData) => {
    setShowFlagConfirmModal(false);
    onClose();
    onAction('flag', { submission, ...finalFlagData });
  };

  const handleCloseApproveModal = () => {
    setShowApproveModal(false);
  };

  const handleCloseFlagModal = () => {
    setShowFlagModal(false);
  };

  const handleCloseFlagConfirmModal = () => {
    setShowFlagConfirmModal(false);
    setShowFlagModal(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isReReview ? 'Re-review Grade Submission' : 'Review Grade Submission'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {submission.teacher} - {submission.subject}
                {isReReview && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400 font-medium">
                    • Previously Flagged
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full ${
                isReReview 
                  ? 'bg-amber-100 dark:bg-amber-900/30' 
                  : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                <span className={`text-sm font-semibold ${
                  isReReview 
                    ? 'text-amber-800 dark:text-amber-300' 
                    : 'text-blue-800 dark:text-blue-300'
                }`}>
                  {submission.gradingPeriod}
                  {isReReview && ' • Needs Re-review'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {submission.gradeLevel} - {submission.section}
              </p>
            </div>
          </div>

          {/* Re-review Notice */}
          {isReReview && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="i-tabler-alert-triangle text-amber-600 dark:text-amber-400 mt-0.5 text-lg" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                    Submission Requires Re-review
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    This grade submission was previously flagged for issues and has been resubmitted. 
                    Please carefully review the corrections made by the teacher.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SubmissionDetails 
              submission={submission} 
              onFlagIssue={() => setShowFlagModal(true)}
              onApprove={() => setShowApproveModal(true)}
              isReReview={isReReview}
            />
            <FileAttachments />
          </div>
        </div>
      </Modal>

      {/* Approve Confirmation Modal */}
      <ApproveConfirmationModal
        isOpen={showApproveModal}
        onClose={handleCloseApproveModal}
        submission={submission}
        onConfirm={handleConfirmApprove}
        isReReview={isReReview}
      />

      {/* Flag Issue Modal */}
      <FlagIssueModal
        isOpen={showFlagModal}
        onClose={handleCloseFlagModal}
        submission={submission}
        onConfirm={handleFlagSubmit}
        isReReview={isReReview}
      />

      {/* Flag Confirmation Modal */}
      <FlagConfirmationModal
        isOpen={showFlagConfirmModal}
        onClose={handleCloseFlagConfirmModal}
        submission={submission}
        onConfirm={handleConfirmFlag}
        flagData={flagData}
        isReReview={isReReview}
      />
    </>
  );
};

export default GradeReviewModal;