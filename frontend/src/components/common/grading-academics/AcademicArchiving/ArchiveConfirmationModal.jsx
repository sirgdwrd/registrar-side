import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const ArchiveConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  gradeLevel,
  progress, // NEW: Progress prop
}) => {
  if (!gradeLevel) return null;

  // Progress steps for single archive
  const progressSteps = [
    "Validating records...",
    "Processing student data...",
    "Finalizing archive...",
  ];

  const currentStep = progress.currentStep || 0;
  const progressPercentage =
    progress.totalSteps > 0 ? (currentStep / progress.totalSteps) * 100 : 0;

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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {progress.isProcessing
                ? "Archiving in Progress..."
                : "Archive Grade Level Records"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {gradeLevel.gradeLevel} • {gradeLevel.schoolYear}
            </p>
          </div>
        </div>

        {/* NEW: Progress Indicator for Single Archive */}
        {progress.isProcessing && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                {progressSteps[currentStep - 1] || "Starting..."}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Step {currentStep} of {progress.totalSteps}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              {progressSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center flex-1 ${
                    index < currentStep ? "text-blue-500 font-medium" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                      index < currentStep
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          {!progress.isProcessing ? (
            <>
              <p className="text-gray-800 dark:text-white font-medium mb-2">
                Archive {gradeLevel.gradeLevel} academic records?
              </p>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Grade Level:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {gradeLevel.gradeLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Records to Archive:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {gradeLevel.completeRecords} student records
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      School Year:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {gradeLevel.schoolYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Grading Period:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {gradeLevel.gradingPeriod}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                This will permanently archive all completed academic records for{" "}
                {gradeLevel.gradeLevel}. Archived records will be moved to
                long-term storage and can be accessed through the Archive
                Viewer.
              </p>
            </>
          ) : (
            // Processing state content
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Archiving {gradeLevel.completeRecords} student records...
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This may take a few moments. Please don't close this window.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          {!progress.isProcessing ? (
            <>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onConfirm}>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Archive Records
              </Button>
            </>
          ) : (
            <Button variant="secondary" disabled>
              Processing...
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ArchiveConfirmationModal;
