import React, { useState } from 'react';
import Modal from "@ui/Modal";
import Button from "@ui/Button";

const OTCConfirmationModal = ({ student, isOpen, onClose, onEnrollmentConfirm }) => {
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [receiptProvided, setReceiptProvided] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!paymentReceived || !receiptProvided) {
      alert('Please check both confirmation boxes');
      return;
    }

    // Pass the OTC data to the parent to continue the flow
    onEnrollmentConfirm({
      studentId: student.id,
      receiptNumber: receiptNumber,
      notes: notes
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setPaymentReceived(false);
    setReceiptProvided(false);
    setReceiptNumber('');
    setNotes('');
    onClose();
  };

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Confirm Over-the-Counter Payment
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
        {/* Payment Information */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Payment Information
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 dark:text-gray-300">Payment Method:</div>
              <div className="text-gray-800 dark:text-white">Over-the-Counter</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">Amount Due:</div>
              <div className="text-gray-800 dark:text-white">₱{student.amount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">Scheduled Date:</div>
              <div className="text-gray-800 dark:text-white">{student.scheduledDate}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">Parent/Guardian:</div>
              <div className="text-gray-800 dark:text-white">Julie Santos</div>
            </div>
          </div>
        </div>

        {/* Confirmation Checkboxes */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Payment Confirmation
          </h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={paymentReceived}
                onChange={(e) => setPaymentReceived(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-800 dark:text-white">
                I can confirm that the payment has been received.
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={receiptProvided}
                onChange={(e) => setReceiptProvided(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-800 dark:text-white">
                Official receipt has been provided to the parent/guardian.
              </span>
            </label>
          </div>
        </div>

        {/* Receipt Number */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
            Receipt Number (Optional)
          </label>
          <input
            type="text"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
            placeholder="Enter receipt number"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this payment..."
            rows="3"
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!paymentReceived || !receiptProvided}
        >
          Confirm Payment & Continue
        </Button>
      </div>
    </Modal>
  );
};

export default OTCConfirmationModal;