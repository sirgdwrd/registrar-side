import React from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";

const BulkArchiveModal = ({
  isOpen,
  onClose,
  onConfirm,
  readyGrades,
  selectedReadyGrades,
  progress, // NEW: Progress prop
}) => {
  if (!isOpen) return null;

  const gradesToProcess = selectedReadyGrades || readyGrades || [];
  const totalRecords = gradesToProcess.reduce(
    (sum, grade) => sum + grade.completeRecords,
    0
  );
  const totalStudents = gradesToProcess.reduce(
    (sum, grade) => sum + grade.totalStudents,
    0
  );

  // Progress calculations
  const progressPercentage =
    progress.totalSteps > 0
      ? (progress.currentStep / progress.totalSteps) * 100
      : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {progress.isProcessing
                ? "Archiving in Progress..."
                : "Archive Selected Grade Levels"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {gradesToProcess.length} grade level(s) selected
            </p>
          </div>
        </div>

        {/* NEW: Progress Indicator */}
        {progress.isProcessing && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Processing: {progress.currentGrade || "Starting..."}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {progress.currentStep} of {progress.totalSteps}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Archiving records... This may take a few minutes.
            </p>
          </div>
        )}

        <div className="mb-6">
          {!progress.isProcessing ? (
            <>
              <p className="text-gray-800 dark:text-white font-medium mb-4">
                Archive {gradesToProcess.length} selected grade level(s)?
              </p>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Grade Levels:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {gradesToProcess.length} grades
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Selected Students:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {totalStudents} students
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Records to Archive:
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {totalRecords} records
                    </span>
                  </div>
                </div>
              </div>

              {gradesToProcess.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade Levels to Archive:
                  </h4>
                  <div className="max-h-32 overflow-y-auto border border-gray-200 dark:border-slate-600 rounded-md">
                    {gradesToProcess.map((grade) => (
                      <div
                        key={grade.id}
                        className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-slate-700 last:border-b-0"
                      >
                        <span className="text-sm text-gray-800 dark:text-white">
                          {grade.gradeLevel}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {grade.completeRecords} records
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300">
                This will archive all completed academic records for the
                selected grade levels. The process may take several minutes
                depending on the number of records.
              </p>
            </>
          ) : (
            // Processing state content
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Archiving {progress.currentGrade}... Please don't close this
                window.
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
              <Button
                variant="primary"
                onClick={onConfirm}
                disabled={gradesToProcess.length === 0}
              >
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
                Archive Selected ({gradesToProcess.length})
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

export default BulkArchiveModal;
