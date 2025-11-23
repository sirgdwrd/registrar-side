import React, { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

const ReviewSectionButtons = ({
  openAddModal,
  setResetModalOpen,
  resetModalOpen,
  resetSections,
  addModalOpen,
  setAddModalOpen,

  gradeLevelOptions, 
  newGradeName,
  setNewGradeName,
  morningSection,
  setMorningSection,
  morningCapacity,
  setMorningCapacity,
  afternoonSection,
  setAfternoonSection,
  afternoonCapacity,
  setAfternoonCapacity,
  gradeError,
  setGradeError,
  saveNewGradeSection,
}) => {
  return (
    <>
      {/* ===== HEADER BUTTONS CONTAINER (Flex Row) ===== */}
      <div className="flex items-center">
        {/* Reset Sections Button */}
        <div className="relative group mr-2">
          <button
            onClick={() => setResetModalOpen(true)}
            className="bg-rose-500 text-white p-2 rounded-lg font-semibold shadow-md hover:bg-rose-600 transition"
            title="Reset All Sections for New SY"
          >
            <RotateCcw size={24} aria-label="Reset All Sections" />
          </button>

          <span
            className="absolute bottom-1/2 right-full mr-2 translate-y-1/2
              bg-gray-800 text-white text-xs font-semibold rounded-md px-2 py-1
              opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
              transition-all duration-300 ease-in-out whitespace-nowrap z-50 pointer-events-none"
          >
            Reset All Sections (SY End)
          </span>
        </div>
        {/* END Reset Sections Button */}

        {/* Add New Grade Button */}
        <div className="relative group">
          <button
            onClick={openAddModal}
            className="bg-sky-500 text-white p-2 rounded-lg font-semibold shadow-md hover:bg-sky-600 transition"
            title="Add New Grade Level"
          >
            <Plus size={24} aria-label="Add New Grade Level" />
          </button>

          <span
            className="absolute bottom-1/2 right-full mr-2 translate-y-1/2
              bg-gray-800 text-white text-xs font-semibold rounded-md px-2 py-1
              opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
              transition-all duration-300 ease-in-out whitespace-nowrap z-50 pointer-events-none"
          >
            Add New Grade Level
          </span>
        </div>
        {/* END Add New Grade Button */}
      </div>
      {/* ===== END HEADER BUTTONS CONTAINER ===== */}

      {/* Reset Sections Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] flex flex-col gap-3 shadow-xl transform transition-all duration-300 scale-100">
            <h3 className="font-bold text-lg text-gray-900 flex items-center">
              <RotateCcw size={20} className="text-indigo-500 mr-2" />
              Confirm Section Reset
            </h3>

            <p className="text-sm text-gray-700">
              Are you sure you want to **reset the enrolled student count (Current) to 0** for ALL sections?
              This is typically done at the **end of a school year**. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setResetModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 font-semibold"
                onClick={resetSections}
              >
                Yes, Reset Sections
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Grade Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[300px] flex flex-col gap-3 shadow-xl transform transition-all duration-300 scale-100">
            <h3 className="font-bold text-lg text-gray-900">
              Add New Grade Section
            </h3>

            {gradeError && (
              <div className="p-2 bg-red-100 text-red-700 border border-red-400 rounded-md text-sm">
                ⚠️ {gradeError}
              </div>
            )}

            <input
              placeholder="Enter New Grade Level Name (e.g., Elem)"
              className={`p-2 rounded border w-full text-gray-900 bg-white ${gradeError ? 'border-red-500' : 'border-gray-300'}`}
              value={newGradeName}
              onChange={(e) => {
                setNewGradeName(e.target.value);
                setGradeError(null);
              }}
            />

            <input
              placeholder="Morning Section Name"
              className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
              value={morningSection}
              onChange={(e) => setMorningSection(e.target.value)}
            />

            <input
              type="number"
              placeholder="Morning Capacity"
              className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
              value={morningCapacity}
              onChange={(e) => setMorningCapacity(e.target.value)}
            />

            <input
              placeholder="Afternoon Section Name"
              className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
              value={afternoonSection}
              onChange={(e) => setAfternoonSection(e.target.value)}
            />

            <input
              type="number"
              placeholder="Afternoon Capacity"
              className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
              value={afternoonCapacity}
              onChange={(e) => setAfternoonCapacity(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600 shadow-sm text-white font-semibold"
                onClick={saveNewGradeSection}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewSectionButtons;
