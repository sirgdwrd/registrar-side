import React, { useState } from "react";

const SendEmailModal = ({ isOpen, onClose, student }) => {
  const [emailData, setEmailData] = useState({
    from: "Registrar (Me)",
    to: student?.newSchool || "Dacayao, Jhego W.",
    subject: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailData.subject.trim()) {
      // Show error in console instead of alert
      console.error("Please enter a subject");
      return;
    }
    console.log("Sending email:", emailData);
    // Success - close both modals or show success message
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-500 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold text-white">Send Email To</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
          >
            <span className="mr-2">←</span> Back
          </button>

          {/* From Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                R
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Registrar</p>
                <p className="text-xs text-gray-500">(Me)</p>
              </div>
            </div>
          </div>

          {/* To Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {emailData.to.charAt(0)}
              </div>
              <span className="text-sm text-gray-900 flex-1">
                {emailData.to}
              </span>
              <button
                onClick={() => setEmailData({ ...emailData, to: "" })}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
              placeholder="Type here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={emailData.message}
              onChange={(e) =>
                setEmailData({ ...emailData, message: e.target.value })
              }
              placeholder="Type your message here..."
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
