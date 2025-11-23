import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  selectedSection,
  data,
}) => {
  if (!isOpen || !actionType || !selectedSection) return null;

  const getActionDetails = () => {
    switch (actionType) {
      case "print":
        return {
          title: "Generate & Print Roster",
          message: `Are you sure you want to generate and print the roster for ${selectedSection.gradeLevel} - ${selectedSection.section}?`,
          description:
            "This will generate a printable roster document with the selected options. The file will be downloaded automatically.",
          confirmText: "Generate & Print",
          variant: "primary",
          icon: (
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          ),
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
        };
      case "notifyTeacher":
        return {
          title: "Send Notification to Teacher",
          message: `Are you sure you want to send this notification to ${selectedSection.advisoryTeacher}?`,
          description:
            "This notification will be sent immediately to the teacher via the selected communication channels.",
          confirmText: "Send Notification",
          variant: "primary",
          icon: (
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
          ),
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
        };
      case "notifyParents":
        const studentCount = data?.selectedStudents?.length || 0;
        return {
          title: "Send Notification to Parents",
          message: `Are you sure you want to send this notification to ${studentCount} parents from ${selectedSection.gradeLevel} - ${selectedSection.section}?`,
          description:
            "This notification will be sent to all selected parents/guardians via the chosen delivery methods (Email, SMS, or both).",
          confirmText: "Send to Parents",
          variant: "primary",
          icon: (
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
          ),
          bgColor: "bg-green-100 dark:bg-green-900/30",
        };
      default:
        return {
          title: "Confirm Action",
          message: "Are you sure you want to proceed?",
          description: "This action cannot be undone.",
          confirmText: "Confirm",
          variant: "primary",
          icon: (
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ),
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
        };
    }
  };

  const actionDetails = getActionDetails();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 ${actionDetails.bgColor} rounded-full flex items-center justify-center`}
          >
            {actionDetails.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {actionDetails.title}
          </h3>
        </div>

        {/* Section Info */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {selectedSection.gradeLevel} - {selectedSection.section}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedSection.advisoryTeacher}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {selectedSection.studentsEnrolled} students
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            {actionDetails.message}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {actionDetails.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={actionDetails.variant} onClick={handleConfirm}>
            {actionDetails.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
