import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const NotifyTeacherModal = ({
  isOpen,
  onClose,
  selectedSection,
  onConfirm,
  onConfirmation,
}) => {
  const [notification, setNotification] = useState({
    messageType: "general",
    customMessage: "",
    urgency: "normal",
  });

  const handleSend = () => {
    // Call onConfirmation instead of onConfirm
    onConfirmation("notifyTeacher", notification);
  };

  // Don't render if no section is selected
  if (!selectedSection) {
    return null;
  }

  const messageTemplates = {
    general: `Hello ${selectedSection.advisoryTeacher}, this is a notification regarding your class ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    attendance: `Hello ${selectedSection.advisoryTeacher}, please review the attendance records for ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    grades: `Hello ${selectedSection.advisoryTeacher}, grade submission deadline is approaching for ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    meeting: `Hello ${selectedSection.advisoryTeacher}, there is an upcoming faculty meeting regarding ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Notify Teacher
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Recipient
            </label>
            <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700 p-3 rounded">
              {selectedSection.advisoryTeacher} - {selectedSection.gradeLevel} -{" "}
              {selectedSection.section}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Message Type
            </label>
            <select
              value={notification.messageType}
              onChange={(e) =>
                setNotification((prev) => ({
                  ...prev,
                  messageType: e.target.value,
                  customMessage: messageTemplates[e.target.value],
                }))
              }
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General Notification</option>
              <option value="attendance">Attendance Review</option>
              <option value="grades">Grade Submission</option>
              <option value="meeting">Faculty Meeting</option>
              <option value="custom">Custom Message</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Message
            </label>
            <textarea
              rows="4"
              value={notification.customMessage}
              onChange={(e) =>
                setNotification((prev) => ({
                  ...prev,
                  customMessage: e.target.value,
                }))
              }
              placeholder="Enter your message to the teacher..."
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Urgency Level
            </label>
            <div className="flex gap-4">
              {["low", "normal", "high"].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="urgency"
                    value={level}
                    checked={notification.urgency === level}
                    onChange={(e) =>
                      setNotification((prev) => ({
                        ...prev,
                        urgency: e.target.value,
                      }))
                    }
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-800 dark:text-white capitalize">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Send Notification
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotifyTeacherModal;
