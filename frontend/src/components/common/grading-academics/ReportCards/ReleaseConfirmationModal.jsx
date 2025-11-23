import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ReleaseConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  reportCard,
}) => {
  if (!reportCard) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Release Report Card
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            Release report card for {reportCard.studentName} to parents?
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This will send the report card via:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-center gap-2">
              <div className="i-tabler-mail text-blue-500" />
              Email to parent's registered email address
            </li>
            <li className="flex items-center gap-2">
              <div className="i-tabler-bell text-green-500" />
              Portal notification in parent's account
            </li>
          </ul>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            <div className="i-tabler-send mr-2" />
            Release Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseConfirmationModal;
