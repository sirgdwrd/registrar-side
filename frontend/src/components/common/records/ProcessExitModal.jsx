import { useState } from "react";

const ProcessExitModal = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState({
    exitReason: "Family relocation to different city",
    requestDate: "Oct 16, 2025",
    lastAttendance: "Oct 15, 2025",
    newSchool: "St. Mary's Academy",
    lastGradeCompleted: "Grade 2",
    exitRemarks: "",
    clearance: {
      library: true,
      finance: true,
      property: true,
      advisory: true,
    },
  });

  if (!isOpen) return null;

  const handleCheckboxChange = (item) => {
    setFormData({
      ...formData,
      clearance: {
        ...formData.clearance,
        [item]: !formData.clearance[item],
      },
    });
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", formData);
    alert("Draft saved successfully!");
  };

  const handleCancelExit = () => {
    if (window.confirm("Are you sure you want to cancel this exit request?")) {
      console.log("Exit cancelled");
      onClose();
    }
  };

  const handleArchiveRecord = () => {
    if (window.confirm("Are you sure you want to archive this record?")) {
      console.log("Archiving record...", formData);
      alert("Record archived successfully!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Process Student Exit - {student?.name || "Abella, John T."}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Student Information */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Student Name:
                </span>
                <span className="ml-2 text-gray-900">
                  {student?.name || "Abella, John T."}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Student ID:</span>
                <span className="ml-2 text-gray-900">
                  {student?.studentId || "GCA-2025-003"}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Grade & Section:
                </span>
                <span className="ml-2 text-gray-900">Grade 2 - Morning</span>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Parent / Guardian:
                </span>
                <span className="ml-2 text-gray-900">Abella, Reyen T.</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Contact:</span>
                <span className="ml-2 text-gray-900">09059147650</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Exit Type:</span>
                <span className="ml-2 text-gray-900">Transfer Out</span>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Exit Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Exit Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exit Reason:
                </label>
                <p className="text-gray-900">{formData.exitReason}</p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Request Date: </span>
                  <span className="text-gray-900 font-medium">
                    {formData.requestDate}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">
                    Last Attendance:{" "}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formData.lastAttendance}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">New School: </span>
                  <span className="text-gray-900 font-medium">
                    {formData.newSchool}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clearance Checklist */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Clearance Checklist
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.clearance.library}
                  onChange={() => handleCheckboxChange("library")}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="ml-3 text-gray-900">
                  Library - No outstanding books
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.clearance.finance}
                  onChange={() => handleCheckboxChange("finance")}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="ml-3 text-gray-900">
                  Finance - No outstanding balances
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.clearance.property}
                  onChange={() => handleCheckboxChange("property")}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="ml-3 text-gray-900">
                  Property - All school materials returned
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.clearance.advisory}
                  onChange={() => handleCheckboxChange("advisory")}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="ml-3 text-gray-900">
                  Advisory Teacher - Clearance Approved
                </span>
              </label>
            </div>
          </div>

          {/* QR Code Status */}
          <div className="mb-6 bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center">
            <div className="text-3xl mr-4">📱</div>
            <div>
              <div className="font-semibold text-gray-900">
                QR Code Status: <span className="text-green-600">Active</span>
              </div>
              <div className="text-sm text-gray-600">
                Will be invalidated upon archiving
              </div>
            </div>
          </div>

          {/* Final Grade and Remarks */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Final Grade Level and Remarks
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Grade Level Completed
                </label>
                <select
                  value={formData.lastGradeCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastGradeCompleted: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option>Kindergarten</option>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                  <option>Grade 3</option>
                  <option>Grade 4</option>
                  <option>Grade 5</option>
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Exit Remarks
                </label>
                <textarea
                  value={formData.exitRemarks}
                  onChange={(e) =>
                    setFormData({ ...formData, exitRemarks: e.target.value })
                  }
                  placeholder="Enter remarks about student exit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handleCancelExit}
              className="px-6 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 font-medium transition-colors"
            >
              Cancel Exit
            </button>
            <button
              onClick={handleArchiveRecord}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium transition-colors"
            >
              Archive Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessExitModal;
