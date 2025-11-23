import React from 'react';
import Modal from "@ui/Modal";
import Button from "@ui/Button";

const EnrollmentConfirmationModal = ({ student, isOpen, onClose, onConfirm }) => {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center p-6">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
          <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Confirm Enrollment Completion
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to complete the enrollment for <span className="font-semibold text-gray-800 dark:text-white">{student.name}</span>? This action will mark the student as officially enrolled in the system.
        </p>

        {/* Actions */}
        <div className="flex justify-center space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm Enrollment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentConfirmationModal;