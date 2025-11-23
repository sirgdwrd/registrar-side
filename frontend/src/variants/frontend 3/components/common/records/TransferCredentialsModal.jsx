import React, { useState } from 'react';
import SendEmailModal from './SendEmailModal';

const TransferCredentialsModal = ({ isOpen, onClose, student }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  
  if (!isOpen) return null;

  const handlePrint = () => {
    console.log('Printing document...');
    window.print();
  };

  const handleSaveAsPDF = () => {
    console.log('Saving as PDF...');
  };

  const handleMarkComplete = () => {
    console.log('Marking as complete...');
    onClose();
  };

  const handleSendEmail = (e) => {
    e.stopPropagation();
    console.log('Opening email modal...');
    setIsEmailModalOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Transfer Credentials - {student?.name || 'Abella, John T.'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form 137 Content */}
        <div className="p-8 bg-amber-50">
          <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
            {/* School Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Gymnazo Christian Academy</h3>
              <p className="text-sm text-gray-600 mt-1">Permanent Record (Form 137)</p>
            </div>

            <hr className="border-gray-300 mb-6" />

            {/* Student Information Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Student Name:</span>
                <span className="text-gray-900">{student?.name || 'Abella, John T.'}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Grade Level:</span>
                <span className="text-gray-900">Grade 2</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">LRN:</span>
                <span className="text-gray-900">136540101290</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">School Year:</span>
                <span className="text-gray-900">2025-2026</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Date of Birth:</span>
                <span className="text-gray-900">March 15, 2018</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Date of Transfer:</span>
                <span className="text-gray-900">October 18, 2025</span>
              </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Academic Record Section */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Academic Record</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Learning Access
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        1st Quarter
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        2nd Quarter
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        Final Grade
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">Mathematics</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">88</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">88</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-green-600">Passed</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">English</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">85</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">85</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-green-600">Passed</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">Science</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">90</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">90</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-green-600">Passed</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">Filipino</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">87</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">87</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-green-600">Passed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-600 italic mt-3">
                This certifies that the above-named student was enrolled in this school and has complied with all academic requirements for Grade 2.
              </p>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <div className="border-t-2 border-gray-900 pt-2 inline-block min-w-[200px]">
                  <p className="font-semibold text-gray-900">Mrs. Regina Santos</p>
                  <p className="text-sm text-gray-600">Registrar</p>
                </div>
              </div>
              <div className="text-right">
                <div className="border-t-2 border-gray-900 pt-2 inline-block min-w-[200px]">
                  <p className="font-semibold text-gray-900">Date: October 18, 2025</p>
                  <p className="text-sm text-gray-600">School Seal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center gap-3 border-t border-gray-200">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleSaveAsPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
          >
            📄 Save as PDF
          </button>
          <button
            onClick={handleMarkComplete}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium transition-colors flex items-center gap-2"
          >
            ✓ Mark Complete
          </button>
          <button
            onClick={handleSendEmail}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium transition-colors flex items-center gap-2"
          >
            ✉️ Send Email To
          </button>
        </div>

        {/* Send Email Modal */}
        <SendEmailModal 
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          student={student}
        />
      </div>
    </div>
  );
};

export default TransferCredentialsModal;