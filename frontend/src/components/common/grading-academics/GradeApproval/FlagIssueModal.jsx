import React, { useState } from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const FlagIssueModal = ({ isOpen, onClose, submission, onConfirm, isReReview }) => {
  const [flagForm, setFlagForm] = useState({
    issueType: '',
    issueDescription: '',
    actionRequired: ''
  });

  const handleFormChange = (field, value) => {
    setFlagForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!flagForm.issueType || !flagForm.actionRequired) {
      return;
    }
    onConfirm(flagForm);
    setFlagForm({ issueType: '', issueDescription: '', actionRequired: '' });
  };

  const handleClose = () => {
    setFlagForm({ issueType: '', issueDescription: '', actionRequired: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 text-amber-600 dark:text-amber-400 i-tabler-alert-triangle" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isReReview ? 'Flag Grade Issues Again' : 'Flag Grade Issue'}
          </h3>
        </div>

        <div className="space-y-6">
          {/* Submission Summary */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
              {isReReview ? 'Resubmission Summary' : 'Submission Summary'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-amber-700 dark:text-amber-400">Teacher:</span>
                <div className="text-amber-800 dark:text-amber-300 font-medium">{submission.teacher}</div>
              </div>
              <div>
                <span className="text-amber-700 dark:text-amber-400">Subject:</span>
                <div className="text-amber-800 dark:text-amber-300 font-medium">{submission.subject}</div>
              </div>
            </div>
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-800 dark:text-white">
              Issue Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['Incomplete grade submission', 'Inconsistent grading scale', 'Missing student grades', 'Other issue'].map((issue) => (
                <label key={issue} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="issueType"
                    value={issue}
                    checked={flagForm.issueType === issue}
                    onChange={(e) => handleFormChange('issueType', e.target.value)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-gray-800 dark:text-white text-sm">{issue}</span>
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
              placeholder={isReReview 
                ? "Describe what still needs to be corrected..." 
                : "Provide detailed description of the grading issue..."
              }
              rows="3"
              value={flagForm.issueDescription}
              onChange={(e) => handleFormChange('issueDescription', e.target.value)}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Required Action */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-800 dark:text-white">
              Required Action <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['Request resubmission', 'Contact teacher', 'Hold approval', 'Other action'].map((action) => (
                <label key={action} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="actionRequired"
                    value={action}
                    checked={flagForm.actionRequired === action}
                    onChange={(e) => handleFormChange('actionRequired', e.target.value)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-gray-800 dark:text-white text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            {isReReview ? 'Flag Issues Again' : 'Flag Issue & Notify'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FlagIssueModal;