import React, { useState, useEffect } from "react";

const SectionAssignmentModal = ({ isOpen, onClose, applicant, onSave }) => {
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedSectionID, setSelectedSectionID] = useState("");

  // Load sections when applicant is set
  useEffect(() => {
    if (applicant?.grade) {
      fetch(`http://localhost/registrar-gca-main/backend/api/sections/getByGrade.php?grade=${applicant.grade}`)
        .then((res) => res.json())
        .then((data) => setSectionOptions(data))
        .catch((err) => console.error(err));
    } else {
      setSectionOptions([]);
    }
  }, [applicant]);

  // Set default selected if applicant already has a section
  useEffect(() => {
    if (applicant?.sectionId) {
      setSelectedSectionID(applicant.sectionId);
    } else {
      setSelectedSectionID("");
    }
  }, [applicant]);

  const handleSave = () => {
    if (!selectedSectionID) {
      alert("Please select a section.");
      return;
    }
    onSave(applicant.id, selectedSectionID); // Pass applicantId & sectionId
  };

  if (!isOpen || !applicant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Assign Section to {applicant.firstName} {applicant.lastName}
        </h2>

        <label className="block text-sm font-medium mb-1">Choose Section</label>
        <select
          className="w-full px-3 py-2 border rounded-lg mb-4"
          value={selectedSectionID}
          onChange={(e) => setSelectedSectionID(e.target.value)}
        >
          <option value="" disabled>
            -- Select Section --
          </option>
          {sectionOptions.map((s) => (
            <option key={s.SectionID} value={s.SectionID}>
              {s.SectionName} ({s.CurrentEnrollment}/{s.MaxCapacity})
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionAssignmentModal;
