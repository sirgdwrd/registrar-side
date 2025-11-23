import React from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const FlagConfirmationModal = ({ isOpen, onClose, submission, onConfirm, flagData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 text-amber-600 dark:text-amber-400 i-tabler-alert-triangle" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Confirm Flag Issue
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            Are you sure you want to flag {submission.teacher}'s {submission.subject} submission?
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This will mark the submission as "Under Review" and notify the teacher to address the issues.
          </p>
          
          {flagData && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Issue:</strong> {flagData.issueType}
              </p>
              {flagData.issueDescription && (
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  <strong>Details:</strong> {flagData.issueDescription}
                </p>
              )}
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                <strong>Action:</strong> {flagData.actionRequired}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onConfirm(flagData)}>
            Confirm Flag
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FlagConfirmationModal;