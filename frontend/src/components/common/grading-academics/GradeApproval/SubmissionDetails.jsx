import React from 'react';
import Button from '../../../ui/Button';
import InfoField from './InfoField';

const SubmissionDetails = ({ submission, onFlagIssue, onApprove }) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Submission Information */}
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
          <InfoField label="Grading Period" value={submission.gradingPeriod} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Review Actions
        </h3>
        <div className="flex flex-col gap-3">
          <Button 
            variant="danger"
            onClick={onFlagIssue}
            className="w-full flex items-center justify-center gap-2"
          >
            <div className="i-tabler-flag text-lg" />
            Flag Issue
          </Button>
          <Button 
            variant="primary"
            onClick={onApprove}
            className="w-full flex items-center justify-center gap-2"
          >
            <div className="i-tabler-check text-lg" />
            Verify & Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;