import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const PrintRostersModal = ({
  isOpen,
  onClose,
  selectedSection,
  onConfirm,
  onConfirmation,
}) => {
  const [printOptions, setPrintOptions] = useState({
    includeContactInfo: true,
    includeEmergencyContacts: false,
    includePhoto: false,
    format: "pdf",
  });

  const handlePrint = () => {
    // Call onConfirmation instead of onConfirm
    onConfirmation("print", printOptions);
  };

  // Don't render if no section is selected
  if (!selectedSection) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
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
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Print Class Roster
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            Print roster for {selectedSection.gradeLevel} -{" "}
            {selectedSection.section}?
          </p>

          <div className="space-y-3 mt-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={printOptions.includeContactInfo}
                onChange={(e) =>
                  setPrintOptions((prev) => ({
                    ...prev,
                    includeContactInfo: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-800 dark:text-white">
                Include contact information
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={printOptions.includeEmergencyContacts}
                onChange={(e) =>
                  setPrintOptions((prev) => ({
                    ...prev,
                    includeEmergencyContacts: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-800 dark:text-white">
                Include emergency contacts
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={printOptions.includePhoto}
                onChange={(e) =>
                  setPrintOptions((prev) => ({
                    ...prev,
                    includePhoto: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-800 dark:text-white">
                Include student photos
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                Format
              </label>
              <select
                value={printOptions.format}
                onChange={(e) =>
                  setPrintOptions((prev) => ({
                    ...prev,
                    format: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV File</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Generate & Print
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintRostersModal;
