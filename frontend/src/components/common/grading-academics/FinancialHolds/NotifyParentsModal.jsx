import React, { useState } from 'react';
import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';

const NotifyParentsModal = ({ student, isOpen, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    includeBalance: true,
    includeDeadline: true,
    urgency: 'normal' // low, normal, high
  });

  // Reset form when modal opens with new student
  React.useEffect(() => {
    if (student && isOpen) {
      setEmailData({
        subject: `Financial Hold Notice - ${student.name}`,
        message: generateDefaultMessage(student),
        includeBalance: true,
        includeDeadline: true,
        urgency: 'normal'
      });
    }
  }, [student, isOpen]);

  const generateDefaultMessage = (student) => {
    return `Dear ${student.parentGuardian},

This is regarding your child ${student.name} (${student.studentId}) who is currently in ${student.gradeLevel} - ${student.section}.

We would like to inform you about an important matter regarding their financial account.

[BALANCE_DETAILS]

[DEADLINE_INFO]

Please visit the school registrar's office at your earliest convenience to settle this matter. You may also contact us at registrar@school.edu.ph or call (02) 1234-5678 for any questions or to discuss payment arrangements.

Thank you for your immediate attention to this matter.

Sincerely,
Registrar's Office
School Name`;
  };

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSend = () => {
    let finalMessage = emailData.message;

    // Replace placeholders based on options
    if (emailData.includeBalance) {
      finalMessage = finalMessage.replace(
        '[BALANCE_DETAILS]',
        `There is an outstanding balance of ${student.outstandingBalance} on the account. This amount needs to be settled to remove the financial hold.`
      );
    } else {
      finalMessage = finalMessage.replace('[BALANCE_DETAILS]', '');
    }

    if (emailData.includeDeadline) {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + 7); // 7 days from now
      finalMessage = finalMessage.replace(
        '[DEADLINE_INFO]',
        `To ensure your child can participate in the upcoming ${student.examPeriod} examinations, please settle this matter by ${deadline.toLocaleDateString()}.`
      );
    } else {
      finalMessage = finalMessage.replace('[DEADLINE_INFO]', '');
    }

    // Clean up any extra line breaks from removed sections
    finalMessage = finalMessage.replace(/\n\s*\n\s*\n/g, '\n\n');

    const emailPayload = {
      to: student.parentGuardian,
      subject: emailData.subject,
      message: finalMessage,
      student: student,
      urgency: emailData.urgency,
      timestamp: new Date().toISOString()
    };

    onSend(emailPayload);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Notify Parents
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Compose email to {student.parentGuardian}
            </p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(emailData.urgency)}`}>
              {emailData.urgency.toUpperCase()}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {student.name}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recipient Info */}
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Recipient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Parent/Guardian" value={student.parentGuardian} />
              <InfoField label="Contact Number" value={student.contact} />
              <InfoField label="Student" value={student.name} />
              <InfoField label="Grade & Section" value={`${student.gradeLevel} - ${student.section}`} />
            </div>
          </div>

          {/* Email Composition */}
          <div className="space-y-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white"
                placeholder="Email subject..."
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={emailData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={12}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white resize-vertical font-mono text-sm"
                placeholder="Compose your message..."
              />
            </div>

            {/* Email Options */}
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Email Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Include Balance */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={emailData.includeBalance}
                    onChange={(e) => handleInputChange('includeBalance', e.target.checked)}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Include Balance Details
                  </label>
                </div>

                {/* Include Deadline */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={emailData.includeDeadline}
                    onChange={(e) => handleInputChange('includeDeadline', e.target.checked)}
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Include Deadline
                  </label>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Urgency
                  </label>
                  <select
                    value={emailData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white text-sm"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>
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
                onClick={handleSend}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Email
              </Button>
            </div>
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

export default NotifyParentsModal;