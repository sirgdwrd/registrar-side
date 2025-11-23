import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const NotifyParentsModal = ({
  isOpen,
  onClose,
  selectedSection,
  students,
  onConfirm,
  onConfirmation,
}) => {
  const [notification, setNotification] = useState({
    messageType: "general",
    customMessage: "",
    deliveryMethod: "both",
    selectedStudents: students ? students.map((s) => s.id) : [],
  });

  const handleSend = () => {
    // Call onConfirmation instead of onConfirm
    onConfirmation("notifyParents", notification);
  };

  // Don't render if no section or students
  if (!selectedSection || !students) {
    return null;
  }

  const messageTemplates = {
    general: `Dear Parent/Guardian, this is a general announcement from ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    attendance: `Dear Parent/Guardian, please be informed about your child's attendance in ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    academic: `Dear Parent/Guardian, this is an update regarding academic performance in ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
    event: `Dear Parent/Guardian, there is an upcoming school event for ${selectedSection.gradeLevel} - ${selectedSection.section}.`,
  };

  const toggleStudentSelection = (studentId) => {
    setNotification((prev) => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter((id) => id !== studentId)
        : [...prev.selectedStudents, studentId],
    }));
  };

  const toggleSelectAll = () => {
    setNotification((prev) => ({
      ...prev,
      selectedStudents:
        prev.selectedStudents.length === students.length
          ? []
          : students.map((s) => s.id),
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Notify Parents
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Class Section
            </label>
            <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700 p-3 rounded">
              {selectedSection.gradeLevel} - {selectedSection.section} (
              {students.length} students)
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
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="general">General Announcement</option>
              <option value="attendance">Attendance Update</option>
              <option value="academic">Academic Progress</option>
              <option value="event">School Event</option>
              <option value="custom">Custom Message</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Message to Parents
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
              placeholder="Enter your message to parents..."
              className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
              Delivery Method
            </label>
            <div className="flex gap-4">
              {[
                { value: "email", label: "Email Only" },
                { value: "sms", label: "SMS Only" },
                { value: "both", label: "Email & SMS" },
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value={method.value}
                    checked={notification.deliveryMethod === method.value}
                    onChange={(e) =>
                      setNotification((prev) => ({
                        ...prev,
                        deliveryMethod: e.target.value,
                      }))
                    }
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-800 dark:text-white">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-800 dark:text-white">
                Select Students ({notification.selectedStudents.length}/
                {students.length})
              </label>
              <button
                onClick={toggleSelectAll}
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                {notification.selectedStudents.length === students.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-slate-600 rounded-md">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-slate-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={notification.selectedStudents.includes(student.id)}
                    onChange={() => toggleStudentSelection(student.id)}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-800 dark:text-white">
                    {student.name} - {student.parentGuardian}
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
            Send to Parents
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotifyParentsModal;
