import React from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const ApproveConfirmationModal = ({ isOpen, onClose, submission, onConfirm, isReReview }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 text-green-600 dark:text-green-400 i-tabler-circle-check" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isReReview ? 'Approve Resubmitted Grades' : 'Approve Grade Submission'}
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            {isReReview 
              ? `Are you sure you want to approve the resubmitted grades for ${submission.teacher} - ${submission.subject}?`
              : `Are you sure you want to approve grades for ${submission.teacher} - ${submission.subject}?`
            }
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isReReview
              ? 'This will finalize the corrected grades and mark the submission as approved.'
              : 'This action will finalize the grades for ${submission.studentCount} students and mark the submission as approved.'
            }
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {isReReview ? 'Confirm Approval' : 'Confirm Approval'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveConfirmationModal;