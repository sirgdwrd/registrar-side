import React from 'react';

const ViewStudentInfoModal = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  const documents = [
    'Application Form',
    'Transcript of Records',
    'Birth Certificate',
    'Photo (2x2)',
    'Good Moral Character',
    'Health Records',
    'Government-issued ID',
    'Test Permit',
    'Proof of Payment'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 border-b-2 border-amber-300">
          <h2 className="text-xl font-semibold text-gray-900">View Student Info</h2>
          <button 
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Photo and Personal Info */}
            <div className="col-span-1">
              {/* Profile Photo */}
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/200" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">First Name</p>
                  <p className="text-sm text-gray-600">Jhego</p>
                  <p className="text-xs text-gray-400 mt-0.5">Age</p>
                  <p className="text-sm text-gray-600">14</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Middle Name</p>
                  <p className="text-sm text-gray-600">Waw</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sex</p>
                  <p className="text-sm text-gray-600">M</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Last Name</p>
                  <p className="text-sm text-gray-600">Dacayo</p>
                  <p className="text-xs text-gray-400 mt-0.5">Birthday</p>
                  <p className="text-sm text-gray-600">03/04/01</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Birthplace</p>
                  <p className="text-sm text-gray-600">Laguna</p>
                  <p className="text-xs text-gray-400 mt-0.5">Religion</p>
                  <p className="text-sm text-gray-600">Catholic</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Mother Tongue</p>
                  <p className="text-sm text-gray-600">English</p>
                  <p className="text-xs text-gray-400 mt-0.5">Weight</p>
                  <p className="text-sm text-gray-600">167cm</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Nationality</p>
                  <p className="text-sm text-gray-600">Filipino</p>
                  <p className="text-xs text-gray-400 mt-0.5">Height</p>
                  <p className="text-sm text-gray-600">49kg</p>
                </div>
              </div>
            </div>

            {/* Middle Column - Family and Contact Info */}
            <div className="col-span-1">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Barangay</p>
                  <p className="text-sm text-gray-400">Lorem</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Municipality</p>
                  <p className="text-sm text-gray-400">Impsum</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Province</p>
                  <p className="text-sm text-gray-400">Lorem Ipsum</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Address</p>
                  <p className="text-sm text-gray-600">512 Oakridge Lane, Maple Grove, OR 97461, USA</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Guardian</p>
                  <p className="text-sm text-gray-400">Lorem</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Parent's Contact Number</p>
                  <p className="text-sm text-gray-600">+63 XXX XXX XXXX</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Parent's Email Address</p>
                  <p className="text-sm text-gray-600">sample@gmail.com</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Father's First Name</p>
                  <p className="text-sm text-gray-400">Lorem</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Father's Middle Name</p>
                  <p className="text-sm text-gray-400">Impsum</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Father's Last Name</p>
                  <p className="text-sm text-gray-400">Lorem Ipsum</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Mother's First Name</p>
                  <p className="text-sm text-gray-400">Lorem</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Mother's Middle Name</p>
                  <p className="text-sm text-gray-400">Impsum</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Mother's Last Name</p>
                  <p className="text-sm text-gray-400">Lorem Ipsum</p>
                </div>
              </div>
            </div>

            {/* Right Column - Documents */}
            <div className="col-span-1">
              <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Documents:</h3>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-400">📄</span>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentInfoModal;