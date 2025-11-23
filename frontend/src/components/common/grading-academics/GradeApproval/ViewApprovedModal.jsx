import React from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';
import FileAttachments from './FileAttachments';
import InfoField from './InfoField';

const ViewApprovedModal = ({ submission, isOpen, onClose }) => {
  if (!submission) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Approved Grade Submission
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {submission.teacher} - {submission.subject}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="text-green-800 dark:text-green-300 text-sm font-semibold">
                APPROVED • {submission.gradingPeriod}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Approved on: {submission.approvedDate || '2024-03-20'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Submission Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Submission Details
              </h3>
              <div className="space-y-3">
                <InfoField label="Teacher" value={submission.teacher} />
                <InfoField label="Subject" value={submission.subject} />
                <InfoField label="Grade & Section" value={`${submission.gradeLevel} - ${submission.section}`} />
                <InfoField label="Student Count" value={submission.studentCount} />
                <InfoField label="Submitted Date" value={submission.submittedDate} />
                <InfoField label="Approved Date" value={submission.approvedDate || '2024-03-20'} />
                <InfoField label="Grading Period" value={submission.gradingPeriod} />
              </div>
            </div>

            {/* Approved Notice */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 text-green-600 dark:text-green-400 i-tabler-circle-check" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">
                    Grades Approved
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    These grades have been finalized and approved for record-keeping.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - File Attachments */}
          <div className="lg:col-span-2">
            <FileAttachments />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewApprovedModal;