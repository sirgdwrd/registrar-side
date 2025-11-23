import React, { useState } from 'react';
import Modal from "@ui/Modal";
import Button from "@ui/Button";

const OnlineVerificationModal = ({ student, isOpen, onClose, onVerificationConfirm, onFlagIssue }) => {
  const [verificationChecks, setVerificationChecks] = useState({
    paymentLegitimate: false,
    amountMatched: false
  });
  const [verificationNotes, setVerificationNotes] = useState('');

  // Get payment method details - with null check
  const getPaymentMethodDetails = (student) => {
    if (!student) return {};
    
    switch (student.paymentMethod) {
      case 'GCash':
        return {
          title: 'GCash Payment',
          detailsTitle: 'GCash Payment Details',
          referenceLabel: 'Reference Number:',
          referenceExample: 'GC-864689537',
          dateLabel: 'Payment Date:',
          dateExample: 'Sep. 29, 2025 10:23 AM',
          parentName: 'Jocelyn Dacayo',
          showBankInfo: false
        };
      case 'Bank Transfer':
        return {
          title: 'Bank Transfer Payment',
          detailsTitle: 'Bank Transfer Details',
          referenceLabel: 'Transaction ID:',
          referenceExample: 'BT-729384651',
          dateLabel: 'Transfer Date:',
          dateExample: 'Sep. 29, 2025 2:15 PM',
          parentName: 'Jocelyn Dacayo',
          showBankInfo: true,
          bankName: student.bankName || 'BPI', // Get from student data
          accountLast4: student.accountLast4 || '7890' // Get from student data
        };
      default:
        return {
          title: 'Online Payment',
          detailsTitle: 'Payment Details',
          referenceLabel: 'Reference:',
          referenceExample: student.referenceNumber,
          dateLabel: 'Date:',
          dateExample: 'Sep. 29, 2025',
          parentName: 'Jocelyn Dacayo',
          showBankInfo: false
        };
    }
  };

  const paymentDetails = getPaymentMethodDetails(student);

  const handleCheckboxChange = (checkName) => {
    setVerificationChecks(prev => ({
      ...prev,
      [checkName]: !prev[checkName]
    }));
  };

  const handleVerify = () => {
    if (!verificationChecks.paymentLegitimate || !verificationChecks.amountMatched) {
      alert('Please confirm both verification checks');
      return;
    }

    onVerificationConfirm({
      studentId: student.id,
      verificationNotes: verificationNotes || null
    });
  };

  const handleFlagIssue = () => {
    onFlagIssue();
  };

  const handleClose = () => {
    // Reset form when closing
    setVerificationChecks({
      paymentLegitimate: false,
      amountMatched: false
    });
    setVerificationNotes('');
    onClose();
  };

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Verify {paymentDetails.title}
        </h2>
      </div>

      {/* Student Info Section */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {student.name}
        </h3>
        <div className="text-red-500 font-medium">Pending ID Generation</div>
        <div className="text-gray-600 dark:text-gray-300">
          {student.gradeLevel} - Morning
        </div>
      </div>

      {/* Modal Content */}
      <div className="px-6 py-4 space-y-6">
        {/* Payment Details */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            {paymentDetails.detailsTitle}
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 dark:text-gray-300">{paymentDetails.referenceLabel}</div>
              <div className="text-gray-800 dark:text-white font-mono">{student.referenceNumber}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">Amount:</div>
              <div className="text-gray-800 dark:text-white">₱{student.amount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">{paymentDetails.dateLabel}</div>
              <div className="text-gray-800 dark:text-white">{paymentDetails.dateExample}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">Parent/Guardian:</div>
              <div className="text-gray-800 dark:text-white">{paymentDetails.parentName}</div>
            </div>
            
            {/* Bank-Specific Information - Only show for Bank Transfer */}
            {paymentDetails.showBankInfo && (
              <>
                <div>
                  <div className="text-gray-600 dark:text-gray-300">Bank:</div>
                  <div className="text-gray-800 dark:text-white">{paymentDetails.bankName}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-300">Account (Last 4):</div>
                  <div className="text-gray-800 dark:text-white">••••{paymentDetails.accountLast4}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Verification Checkboxes */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Verification
          </h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={verificationChecks.paymentLegitimate}
                onChange={() => handleCheckboxChange('paymentLegitimate')}
                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-800 dark:text-white">
                I have verified this {student.paymentMethod?.toLowerCase()} payment is legitimate.
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={verificationChecks.amountMatched}
                onChange={() => handleCheckboxChange('amountMatched')}
                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-800 dark:text-white">
                Payment amount matched the required down payment.
              </span>
            </label>
          </div>
        </div>

        {/* Verification Notes */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
            Verification Notes
          </label>
          <textarea
            value={verificationNotes}
            onChange={(e) => setVerificationNotes(e.target.value)}
            placeholder="Add any verification notes or observations..."
            rows="3"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optional: Note any observations about the payment verification.
          </p>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-between">
        {/* Flag Issue Button */}
        <Button 
          variant="danger" 
          onClick={handleFlagIssue}
        >
          Flag Issue
        </Button>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVerify}
            disabled={!verificationChecks.paymentLegitimate || !verificationChecks.amountMatched}
          >
            Verify and Enroll
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OnlineVerificationModal;