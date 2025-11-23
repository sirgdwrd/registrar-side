import React, { useState } from 'react';
import Modal from "@ui/Modal";
import Button from "@ui/Button";

const StudentIDAssignmentModal = ({ student, isOpen, onClose, onConfirm }) => {
  const [studentID, setStudentID] = useState('');
  const [error, setError] = useState('');

  if (!student) return null;

  const handleSubmit = () => {
    if (!studentID.trim()) {
      setError('Please enter a valid Student ID');
      return;
    }

    if (studentID.length < 3) {
      setError('Student ID must be at least 3 characters long');
      return;
    }

    setError('');
    onConfirm(studentID);
  };

  const handleStudentIDChange = (value) => {
    setStudentID(value);
    if (error) setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Enrollment Complete
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please assign a Student ID for <span className="font-semibold text-gray-800 dark:text-white">{student.name}</span>.
          </p>
        </div>

        {/* Student ID Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
            Enter Student ID
          </label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => handleStudentIDChange(e.target.value)}
            placeholder="e.g., 2024-00123"
            className={`w-full border rounded-md px-3 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This ID will be used for the student's official records and login credentials.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!studentID.trim()}
          >
            Confirm & Complete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentIDAssignmentModal;