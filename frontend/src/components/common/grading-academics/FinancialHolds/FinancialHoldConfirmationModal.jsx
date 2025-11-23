import React from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const FinancialHoldConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  student,
  actionType 
}) => {
  if (!student) return null;

  const getActionDetails = () => {
    switch (actionType) {
      case 'clear':
        return {
          title: 'Clear Financial Hold',
          message: `Are you sure you want to clear the financial hold for ${student.name}?`,
          description: 'This action will remove the financial restriction and allow the student to take exams. The outstanding balance will still need to be settled, but the hold will be temporarily lifted.',
          confirmText: 'Clear Hold',
          variant: 'danger'
        };
      case 'notify':
        return {
          title: 'Notify Parents',
          message: `Send notification to ${student.parentGuardian}?`,
          description: 'This will send an automated notification to the parent/guardian about the financial hold status and outstanding balance.',
          confirmText: 'Send Notification',
          variant: 'primary'
        };
      case 'extend':
        return {
          title: 'Extend Deadline',
          message: `Extend financial hold deadline for ${student.name}?`,
          description: 'This will extend the payment deadline by 7 days. The student will remain restricted from exams until the new deadline.',
          confirmText: 'Extend Deadline',
          variant: 'primary'
        };
      default:
        return {
          title: 'Confirm Action',
          message: 'Are you sure you want to proceed?',
          description: 'This action will modify the student\'s financial hold status.',
          confirmText: 'Confirm',
          variant: 'primary'
        };
    }
  };

  const actionDetails = getActionDetails();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        {/* Header with warning icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {actionDetails.title}
          </h3>
        </div>

        {/* Student Info */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{student.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {student.studentId} • {student.gradeLevel} - {student.section}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                {student.outstandingBalance}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            {actionDetails.message}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {actionDetails.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant={actionDetails.variant}
            onClick={handleConfirm}
          >
            {actionDetails.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FinancialHoldConfirmationModal;