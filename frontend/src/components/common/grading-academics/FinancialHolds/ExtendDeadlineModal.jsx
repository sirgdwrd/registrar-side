import React, { useState, useEffect } from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const ExtendDeadlineModal = ({ student, isOpen, onClose, onExtend }) => {
  const [extensionData, setExtensionData] = useState({
    newDeadline: '',
    extensionReason: '',
    sendEmail: true,
    emailSubject: '',
    emailMessage: '',
    includeInstructions: true
  });

  // Calculate default dates
  const today = new Date();
  const defaultDeadline = new Date();
  defaultDeadline.setDate(today.getDate() + 7); // Default: 7 days from now

  // Reset form when modal opens with new student
  useEffect(() => {
    if (student && isOpen) {
      const formattedDate = defaultDeadline.toISOString().split('T')[0];
      
      setExtensionData({
        newDeadline: formattedDate,
        extensionReason: 'Payment extension granted',
        sendEmail: true,
        emailSubject: `Payment Deadline Extended - ${student.name}`,
        emailMessage: generateDefaultEmail(student, formattedDate),
        includeInstructions: true
      });
    }
  }, [student, isOpen]);

  const generateDefaultEmail = (student, deadline) => {
    const deadlineDate = new Date(deadline);
    const formattedDeadline = deadlineDate.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Dear ${student.parentGuardian},

We are writing to inform you that the payment deadline for your child ${student.name} (${student.studentId}) has been extended.

The new deadline for settling the outstanding balance is: ${formattedDeadline}

[INSTRUCTIONS_SECTION]

Please note that the financial hold will remain in place until the balance is settled. Failure to meet the extended deadline may result in your child being unable to participate in the ${student.examPeriod} examinations.

If you have any questions or need to discuss payment arrangements, please don't hesitate to contact the registrar's office.

Thank you for your cooperation.

Sincerely,
Registrar's Office
School Name`;
  };

  const handleInputChange = (field, value) => {
    setExtensionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExtend = () => {
    let finalEmailMessage = extensionData.emailMessage;

    // Replace instructions placeholder if included
    if (extensionData.includeInstructions) {
      finalEmailMessage = finalEmailMessage.replace(
        '[INSTRUCTIONS_SECTION]',
        `Payment Instructions:
• You may pay via bank transfer to Account Name: School Name, Account Number: 1234-5678-9012
• Over-the-counter payments are accepted at the school cashier from 8:00 AM to 4:00 PM, Monday to Friday
• GCash payments: Send to 0917-123-4567 (include student name and ID in the reference)`
      );
    } else {
      finalEmailMessage = finalEmailMessage.replace('[INSTRUCTIONS_SECTION]', '');
    }

    // Clean up any extra line breaks
    finalEmailMessage = finalEmailMessage.replace(/\n\s*\n\s*\n/g, '\n\n');

    const extensionPayload = {
      student: student,
      newDeadline: extensionData.newDeadline,
      extensionReason: extensionData.extensionReason,
      emailData: extensionData.sendEmail ? {
        to: student.parentGuardian,
        subject: extensionData.emailSubject,
        message: finalEmailMessage,
        includeInstructions: extensionData.includeInstructions
      } : null,
      extendedBy: 'Registrar', // In real app, this would be the logged-in user
      extendedAt: new Date().toISOString()
    };

    onExtend(extensionPayload);
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysFromToday = (dateString) => {
    if (!dateString) return 0;
    const targetDate = new Date(dateString);
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (!student) return null;

  const daysExtension = getDaysFromToday(extensionData.newDeadline);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Extend Payment Deadline
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Set new deadline for {student.name}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
              <span className="text-amber-800 dark:text-amber-300 text-sm font-semibold">
                {daysExtension} day{daysExtension !== 1 ? 's' : ''} extension
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Current: {student.examPeriod}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Student Information */}
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Student" value={student.name} />
              <InfoField label="Grade & Section" value={`${student.gradeLevel} - ${student.section}`} />
              <InfoField label="Parent/Guardian" value={student.parentGuardian} />
              <InfoField label="Outstanding Balance" value={student.outstandingBalance} />
            </div>
          </div>

          {/* Deadline Extension Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Set New Deadline
            </h3>
            
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Deadline Date
              </label>
              <input
                type="date"
                value={extensionData.newDeadline}
                onChange={(e) => handleInputChange('newDeadline', e.target.value)}
                min={today.toISOString().split('T')[0]}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Selected: {formatDateDisplay(extensionData.newDeadline)}
              </p>
            </div>

            {/* Extension Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for Extension (Optional)
              </label>
              <input
                type="text"
                value={extensionData.extensionReason}
                onChange={(e) => handleInputChange('extensionReason', e.target.value)}
                placeholder="e.g., Payment arrangement, Special circumstance..."
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Email Notification Section */}
          <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={extensionData.sendEmail}
                onChange={(e) => handleInputChange('sendEmail', e.target.checked)}
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Send notification email to parents
              </label>
            </div>

            {extensionData.sendEmail && (
              <div className="space-y-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                {/* Email Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={extensionData.emailSubject}
                    onChange={(e) => handleInputChange('emailSubject', e.target.value)}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
                  />
                </div>

                {/* Email Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Message
                  </label>
                  <textarea
                    value={extensionData.emailMessage}
                    onChange={(e) => handleInputChange('emailMessage', e.target.value)}
                    rows={8}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white resize-vertical text-sm"
                  />
                </div>

                {/* Include Instructions */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={extensionData.includeInstructions}
                    onChange={(e) => handleInputChange('includeInstructions', e.target.checked)}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Include payment instructions in email
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button 
              variant="secondary" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleExtend}
              disabled={!extensionData.newDeadline}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Extend Deadline
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Helper component for consistent info display
const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
      {label}
    </label>
    <p className="text-sm text-gray-800 dark:text-white font-medium">
      {value || 'N/A'}
    </p>
  </div>
);

export default ExtendDeadlineModal;