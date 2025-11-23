import React, { useState } from 'react';
import Modal from "@ui/Modal";
import Button from "@ui/Button";

const FlagIssueModal = ({ student, isOpen, onClose, onIssueFlagged }) => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [actionRequired, setActionRequired] = useState('');

  const commonIssues = [
    'Payment amount does not match',
    'Suspicious transaction',
    'Duplicate payment detected',
    'Reference number invalid',
    'Payment date questionable',
    'Incorrect payment method',
    'Other issue'
  ];

const actionOptions = [
  'I will contact parent/guardian for clarification',
  'Request additional proof of payment from parent/guardian',
  'Hold enrollment until payment is verified',
  'Mark for follow-up tomorrow',
  'Other action required'
];

  const handleSubmit = () => {
    if (!selectedIssue) {
      alert('Please select an issue type');
      return;
    }

    if (!actionRequired) {
      alert('Please select required action');
      return;
    }

    onIssueFlagged({
      studentId: student.id,
      issueType: selectedIssue,
      issueDescription: issueDescription || 'No additional details provided',
      actionRequired: actionRequired,
      flaggedBy: 'Registrar', // This would be the actual user in real system
      flaggedAt: new Date().toISOString()
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setSelectedIssue('');
    setIssueDescription('');
    setActionRequired('');
    onClose();
  };

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Flag Payment Issue
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Report an issue with payment for {student.name}
        </p>
      </div>

      {/* Modal Content */}
      <div className="px-6 py-4 space-y-6">
        {/* Payment Summary */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
            Payment Summary
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-amber-700 dark:text-amber-400">Student:</span>
              <div className="text-amber-800 dark:text-amber-300 font-medium">{student.name}</div>
            </div>
            <div>
              <span className="text-amber-700 dark:text-amber-400">Payment Method:</span>
              <div className="text-amber-800 dark:text-amber-300 font-medium">{student.paymentMethod}</div>
            </div>
            <div>
              <span className="text-amber-700 dark:text-amber-400">Amount:</span>
              <div className="text-amber-800 dark:text-amber-300 font-medium">₱{student.amount.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-amber-700 dark:text-amber-400">Reference:</span>
              <div className="text-amber-800 dark:text-amber-300 font-medium font-mono">{student.referenceNumber}</div>
            </div>
          </div>
        </div>

        {/* Issue Type */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-800 dark:text-white">
            Issue Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {commonIssues.map((issue) => (
              <label key={issue} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="issueType"
                  value={issue}
                  checked={selectedIssue === issue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-gray-800 dark:text-white text-sm">
                  {issue}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
            Issue Description
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Provide detailed description of the issue..."
            rows="3"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Describe what's wrong with this payment for the review team.
          </p>
        </div>

        {/* Required Action */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-800 dark:text-white">
            Required Action <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {actionOptions.map((action) => (
              <label key={action} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="actionRequired"
                  value={action}
                  checked={actionRequired === action}
                  onChange={(e) => setActionRequired(e.target.value)}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-gray-800 dark:text-white text-sm">
                  {action}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-300">
                Important
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                This payment will be marked as "Under Review" and the student's enrollment will be paused until you resolve the issue. You can follow up on this from the enrollment dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={handleSubmit}
          disabled={!selectedIssue || !actionRequired}
        >
          Flag Issue & Notify
        </Button>
      </div>
    </Modal>
  );
};

export default FlagIssueModal;