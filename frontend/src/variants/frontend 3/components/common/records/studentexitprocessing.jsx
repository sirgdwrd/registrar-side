import React, { useState } from 'react';

// NOTE: We are defining a placeholder Modal component here since the original code referenced 
// an external file (./ProcessExitModal), but React projects must be single-file.
// This is the detailed form structure you requested previously.

const ProcessExitModal = ({ isOpen, onClose, student }) => {
  // Use a sensible default structure for student data if none is provided
  if (!isOpen || !student) return null;

  // Initial state for the complex form fields
  const [exitData, setExitData] = useState({
    // Student Core Details (mostly static/read-only display)
    studentName: student.name || 'N/A',
    studentId: student.studentId || 'N/A',
    gradeSection: 'Grade 7 - Morning', // Mocked section
    exitType: student.exitType || 'Transfer Out',
    
    // Exit Details (Mock Data from the screenshot)
    parentGuardian: 'Reyes T.',
    contact: '09XX-XXX-XXXX',
    exitReason: 'Family relocation to different city',
    requestDate: student.requestDate || 'Oct 15, 2025',
    lastAttendance: 'Oct 15, 2025',
    newSchool: "St. Mary's Academy",

    // Clearance Checklist (Boolean states)
    libraryCleared: false,
    financeCleared: false,
    propertyCleared: false,
    advisoryCleared: false,
    
    // Finalization
    lastGradeCompleted: student.gradeLevel || 'Grade 7',
    exitRemarks: ''
  });

  // Handler for text input and select changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExitData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExitData(prev => ({ ...prev, [name]: checked }));
  };

  // --- Button Action Handlers ---
  const handleSaveDraft = () => {
    console.log('Saving Draft:', exitData);
    onClose();
  };

  const handleCancelExit = () => {
    console.log('Cancelling Exit process for:', exitData.studentName);
    onClose();
  };

  const handleArchiveRecord = () => {
    const isCleared = exitData.libraryCleared && exitData.financeCleared && exitData.propertyCleared && exitData.advisoryCleared;
    
    if (!isCleared) {
      console.error('ARCHIVE FAILED: Clearance checklist is incomplete.');
      return; 
    }
    console.log('Archiving Record (Finalizing Exit):', exitData);
    onClose();
  };


  return (
    // Backdrop overlay
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-start justify-center p-4 md:p-10 z-50 overflow-y-auto">
      {/* Modal content container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mt-10 p-6 md:p-8 transform transition-transform duration-300">
        
        {/* Header Bar - Matches the yellow/orange look from the screenshot */}
        <div className="flex justify-between items-center bg-yellow-400 text-gray-900 font-extrabold text-lg md:text-xl p-4 -mx-6 -mt-6 md:-mx-8 md:-mt-8 rounded-t-2xl shadow-md">
          <h3 className="tracking-tight">
            Process Student Exit - {exitData.studentName}
          </h3>
          <button onClick={onClose} className="text-gray-900 hover:text-black/80 text-3xl leading-none">
            &times;
          </button>
        </div>

        <div className="p-4 pt-6 text-gray-800">
          
          {/* STUDENT CORE DETAILS & EXIT DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mb-6 text-sm">
            <h4 className="col-span-1 lg:col-span-3 text-md font-extrabold text-blue-600 mb-2 border-b border-blue-100 pb-1">Student and Exit Details</h4>
            
            <p><span className="font-bold">Student Name:</span> {exitData.studentName}</p>
            <p><span className="font-bold">Parent / Guardian:</span> {exitData.parentGuardian}</p>
            <p><span className="font-bold">Exit Type:</span> {exitData.exitType}</p>
            
            <p><span className="font-bold">Student ID:</span> {exitData.studentId}</p>
            <p><span className="font-bold">Contact:</span> {exitData.contact}</p>
            <p><span className="font-bold">Request Date:</span> {exitData.requestDate}</p>

            <p><span className="font-bold">Grade & Section:</span> {exitData.lastGradeCompleted} - Morning</p>
            <p><span className="font-bold">Last Attendance:</span> {exitData.lastAttendance}</p>
            <p><span className="font-bold">New School:</span> {exitData.newSchool}</p>

            <p className="lg:col-span-3 mt-2"><span className="font-bold">Exit Reason:</span> {exitData.exitReason}</p>
          </div>

          {/* CLEARANCE CHECKLIST (Yellow Box) */}
          <div className="mb-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-inner">
            <h4 className="text-lg font-extrabold text-gray-900 mb-4">Clearance Checklist</h4>
            <div className="space-y-3">
              {[
                { label: 'Library - No outstanding books', name: 'libraryCleared', checked: exitData.libraryCleared },
                { label: 'Finance - No outstanding balances', name: 'financeCleared', checked: exitData.financeCleared },
                { label: 'Property - All school materials returned', name: 'propertyCleared', checked: exitData.propertyCleared },
                { label: 'Advisory Teacher - Clearance Approved', name: 'advisoryCleared', checked: exitData.advisoryCleared },
              ].map((item) => (
                <label key={item.name} className="flex items-center text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={item.checked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </label>
              ))}
            </div>

            {/* QR Code Status */}
            <div className="mt-6 p-4 border-t border-yellow-300 pt-4">
              <p className="text-sm font-bold text-gray-900">
                📱 QR Code Status: <span className="text-green-600">Active</span>
              </p>
              <p className="text-xs text-gray-600 italic">
                Will be invalidated upon archiving
              </p>
            </div>
          </div>

          {/* FINAL GRADE LEVEL AND REMARKS */}
          <div className="mb-6">
            <h4 className="text-lg font-extrabold text-gray-900 mb-3">Final Grade Level and Remarks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Last Grade Level Completed</label>
                <select 
                  name="lastGradeCompleted"
                  value={exitData.lastGradeCompleted}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                >
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Exit Remarks</label>
                <textarea
                  name="exitRemarks"
                  value={exitData.exitRemarks}
                  onChange={handleInputChange}
                  placeholder="Enter remarks about student exit."
                  rows="3"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2.5 text-sm font-semibold bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors shadow-md"
            >
              Save Draft
            </button>
            <button
              onClick={handleCancelExit}
              className="px-6 py-2.5 text-sm font-semibold bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors shadow-md"
            >
              Cancel Exit
            </button>
            <button
              onClick={handleArchiveRecord}
              className="px-6 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md transform hover:scale-[1.02] active:scale-100 disabled:opacity-50"
              disabled={!exitData.libraryCleared || !exitData.financeCleared || !exitData.propertyCleared || !exitData.advisoryCleared}
            >
              Archive Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// ========================================================================
// StudentExitProcessing Component (The main dashboard view)
// ========================================================================
const StudentExitProcessing = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    exitType: 'all',
    gradeLevel: 'all',
    status: 'all'
  });

  // Sample data - replace with actual data from your backend
  const students = [
    {
      id: 1,
      name: 'Abuel, Kristine M.',
      studentId: 'GCA-2025-004',
      gradeLevel: 'Grade 7',
      exitType: 'Transfer Out',
      requestDate: 'Oct 15, 2025',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Almilla, John T.',
      studentId: 'GCA-2025-006',
      gradeLevel: 'Grade 9',
      exitType: 'Graduation',
      requestDate: 'Oct 16, 2025',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Bordallo, Angelo J.',
      studentId: 'GCA-2025-011',
      gradeLevel: 'Grade 4',
      exitType: 'Transfer Out',
      requestDate: 'Oct 20, 2025',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Cruz, Catherine S.',
      studentId: 'GCA-2025-017',
      gradeLevel: 'Grade 3',
      exitType: 'Dropped',
      requestDate: 'Oct 21, 2025',
      status: 'Pending'
    }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const handleExportList = () => {
    console.log('Exporting list...');
  };

  const handleProcessSelected = () => {
    if (selectedStudents.length === 0) {
      console.log('Please select at least one student');
      return;
    }
    console.log(`Processing ${selectedStudents.length} student(s)`);
  };

  const handleProcessStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      
      {/* Animation applied to the main content container */}
      <div className="max-w-7xl mx-auto animate-fadeIn">
        {/* Header Section with Dark Brown Bar */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-6 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Student Exit and Record Archiving
          </h2>
          
          {/* Dark Brown Header Bar - Matching EnrollmentReports */}
          <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-xl">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">Exit Type:</label>
              <select 
                value={filters.exitType}
                onChange={(e) => handleFilterChange('exitType', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="transfer">Transfer Out</option>
                <option value="graduation">Graduation</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">Grade Level:</label>
              <select 
                value={filters.gradeLevel}
                onChange={(e) => handleFilterChange('gradeLevel', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Grades</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">Status:</label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="ml-auto flex gap-2">
              <button 
                onClick={handleExportList}
                className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-lg">📄</span>
                <span className="text-sm font-bold">Export List</span>
              </button>
              <button 
                onClick={handleProcessSelected}
                className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-lg">✓</span>
                <span className="text-sm font-bold">Process Selected</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">Pending Exit Processing</h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">8</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">Transfer Requests</h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">5</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">Deactivations</h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">2</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">Other Exits</h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">1</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-x-auto hover:shadow-2xl transition-all duration-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={students.length > 0 && selectedStudents.length === students.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Grade Level
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Exit Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01]">
                  <td className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {student.gradeLevel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {student.exitType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {student.requestDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleProcessStudent(student)}
                      className="px-4 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                    >
                      👁️ Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (show if no students) */}
        {students.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md mt-6">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">No pending exit processing requests at the moment.</p>
          </div>
        )}
      </div>

      {/* Process Exit Modal */}
      <ProcessExitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default StudentExitProcessing;