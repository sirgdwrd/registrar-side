import React, { useState } from 'react';
import Modal from '../../../ui/Modal.jsx';  // Changed from "../../ui/Modal.jsx"
import Button from '../../../ui/Button.jsx'; // Changed from "../../ui/Button.jsx"

const StudentProfileModal = ({ student, isOpen, onClose }) => {
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  if (!student) return null;

  // Mock data - replace with actual API data
  const studentDetails = {
    profilePicture: null,
    firstName: student.name.split(' ')[0] || 'N/A',
    middleName: 'Middle',
    lastName: student.name.split(' ')[1] || 'N/A',
    birthPlace: 'Manila, Philippines',
    motherTongue: 'Filipino',
    nationality: 'Filipino',
    barangay: 'Barangay 123',
    municipality: 'Manila',
    province: 'Metro Manila',
    address: '123 Main Street, Manila',
    fatherFirstName: 'Juan',
    fatherMiddleName: 'Dela',
    fatherLastName: 'Cruz',
    motherFirstName: 'Maria',
    motherMiddleName: 'Santos',
    motherLastName: 'Reyes',
    parentGuardianName: student.parentGuardian,
    parentGuardianContact: student.contactNumber,
    parentGuardianEmail: 'parent@example.com',
    outstandingBalance: '₱5,000.00'
  };

  const handleViewDocuments = () => {
    setShowDocumentsModal(true);
  };

  const handleConfirmDocuments = () => {
    setShowDocumentsModal(false);
    onClose();
    // TODO: Navigate to student documents page
    // Replace this with your actual routing:
    // navigate(`/students/${student.id}/documents`);
    // OR: window.location.href = `/students/${student.id}/documents`;
    console.log(`Navigate to documents page for student: ${student.id}`);
  };

  const DocumentsConfirmationModal = () => (
    <Modal isOpen={showDocumentsModal} onClose={() => setShowDocumentsModal(false)} size="sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          View Student Documents
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to view the documents for {student.name}? 
          You will be redirected to the documents page.
        </p>
        <div className="flex gap-3 justify-end">
          <Button 
            variant="secondary" 
            onClick={() => setShowDocumentsModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirmDocuments}
          >
            View Documents
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Student Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                ID: {student.studentId}
              </p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                student.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
              }`}>
                {student.status}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {student.gradeLevel} - {student.section}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="First Name" value={studentDetails.firstName} />
                  <InfoField label="Middle Name" value={studentDetails.middleName} />
                  <InfoField label="Last Name" value={studentDetails.lastName} />
                  <InfoField label="Birthplace" value={studentDetails.birthPlace} />
                  <InfoField label="Mother Tongue" value={studentDetails.motherTongue} />
                  <InfoField label="Nationality" value={studentDetails.nationality} />
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Barangay" value={studentDetails.barangay} />
                  <InfoField label="Municipality" value={studentDetails.municipality} />
                  <InfoField label="Province" value={studentDetails.province} />
                  <div className="md:col-span-2">
                    <InfoField label="Complete Address" value={studentDetails.address} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Family & Financial */}
            <div className="space-y-6">
              {/* Parent Information */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Parent Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Father</h4>
                    <InfoField label="First Name" value={studentDetails.fatherFirstName} />
                    <InfoField label="Middle Name" value={studentDetails.fatherMiddleName} />
                    <InfoField label="Last Name" value={studentDetails.fatherLastName} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Mother</h4>
                    <InfoField label="First Name" value={studentDetails.motherFirstName} />
                    <InfoField label="Middle Name" value={studentDetails.motherMiddleName} />
                    <InfoField label="Last Name" value={studentDetails.motherLastName} />
                  </div>
                </div>
              </div>

              {/* Guardian & Financial */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Guardian & Financial
                </h3>
                <div className="space-y-3">
                  <InfoField label="Parent/Guardian Name" value={studentDetails.parentGuardianName} />
                  <InfoField label="Contact Number" value={studentDetails.parentGuardianContact} />
                  <InfoField label="Email Address" value={studentDetails.parentGuardianEmail} />
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                    <InfoField 
                      label="Outstanding Balance" 
                      value={studentDetails.outstandingBalance}
                      valueClassName="text-red-600 dark:text-red-400 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  variant="primary" 
                  onClick={handleViewDocuments}
                  className="w-full"
                >
                  View Documents
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="w-full"
                >
                  Close Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <DocumentsConfirmationModal />
    </>
  );
};

// Helper component for consistent info display
const InfoField = ({ label, value, valueClassName = "" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
      {label}
    </label>
    <p className={`text-gray-800 dark:text-white ${valueClassName}`}>
      {value || 'N/A'}
    </p>
  </div>
);

export default StudentProfileModal;