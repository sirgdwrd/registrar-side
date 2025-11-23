import React, { useState, useEffect } from 'react';
import ViewStudentInfoModal from './ViewStudentInfoModal';


  
const ArchiveSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    schoolYear: 'all',
    exitType: 'all'
  });
  const [selectedRecords, setSelectedRecords] = useState([]);

  // Apply Poppins font for consistency
  useEffect(() => {
    const prev = document.body.style.fontFamily;
    document.body.style.fontFamily = "'Poppins', sans-serif";
    return () => {
      document.body.style.fontFamily = prev || '';
    };
  }, []);

  // Sample archived data
  const archivedRecords = [
    {
      id: 1,
      studentName: 'Abuel, Kristine M.',
      studentId: 'GCA-2025-004',
      lastGradeLevel: 'Grade 2',
      exitType: 'Transfer Out',
      exitDate: 'Oct 15, 2025',
      archiveDate: 'Oct 20, 2025'
    },
    {
      id: 2,
      studentName: 'Abella, John T.',
      studentId: 'GCA-2025-006',
      lastGradeLevel: 'Grade 3',
      exitType: 'Transfer Out',
      archiveDate: 'Oct 16, 2025',
      exitDate: 'Oct 22, 2025'
    },
    {
      id: 3,
      studentName: 'Bordallo, Angelo J.',
      studentId: 'GCA-2025-011',
      lastGradeLevel: 'Grade 4',
      exitType: 'Graduation',
      exitDate: 'Oct 20, 2025',
      archiveDate: 'Oct 28, 2025'
    },
    {
      id: 4,
      studentName: 'Cruz, Catherine S.',
      studentId: 'GCA-2025-017',
      lastGradeLevel: 'Grade 5',
      exitType: 'Dropped',
      exitDate: 'Oct 21, 2025',
      archiveDate: 'Oct 29, 2025'
    }
  ];

  const handleSelectAll = (e) => {
    setSelectedRecords(e.target.checked ? archivedRecords.map(r => r.id) : []);
  };

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev =>
      prev.includes(recordId)
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleViewArchiveLog = () => alert('Opening archive log...');
  const handleExportResults = () => alert('Exporting search results...');
  const handleSearchArchive = () => console.log('Searching archives...', { searchTerm, filters });

  const handleViewRecord = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-8 font-sans">
      <div className="max-w-7xl mx-auto animate-fadeIn">
        
        {/* Header with Title and Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Student Records Archive Search
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={handleViewArchiveLog}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 text-sm font-semibold text-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              📋 View Archive Log
            </button>
            <button 
              onClick={handleExportResults}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              📊 Export Search Results
            </button>
          </div>
        </div>

        {/* Yellow Search Box */}
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 p-6 rounded-xl mb-6 shadow-sm">
          <label className="block text-sm font-bold text-gray-800 mb-3">Search Student Records</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Student name, ID, or other details"
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <select 
              value={filters.schoolYear}
              onChange={(e) => setFilters({...filters, schoolYear: e.target.value})}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Years</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
            <select 
              value={filters.exitType}
              onChange={(e) => setFilters({...filters, exitType: e.target.value})}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="transfer">Transfer Out</option>
              <option value="graduation">Graduation</option>
              <option value="dropped">Dropped</option>
            </select>
            <button 
              onClick={handleSearchArchive}
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🔍 Search Archive
            </button>
          </div>
        </div>

        {/* Statistics Cards - Yellow Background */}
        <div className="grid grid-cols-4 gap-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 p-6 rounded-xl mb-6 shadow-sm">
          {[
            { label: 'Total Archived Records', value: '2,458' },
            { label: 'Graduated Students', value: '156' },
            { label: 'Transferred Out', value: '892' },
            { label: 'Archive Size', value: '45.7 GB' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-700 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    checked={archivedRecords.length > 0 && selectedRecords.length === archivedRecords.length}
                    onChange={handleSelectAll}
                  />
                </th>
                {['Student Name', 'Student ID', 'Last Grade Level', 'Exit Type', 'Exit Date', 'Archive Date', 'Actions'].map((heading, i) => (
                  <th key={i} className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wide">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {archivedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-all duration-150">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => handleSelectRecord(record.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{record.studentName}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{record.studentId}</td>
                  <td className="px-6 py-4 text-gray-700">{record.lastGradeLevel}</td>
                  <td className="px-6 py-4 text-gray-700">{record.exitType}</td>
                  <td className="px-6 py-4 text-gray-700">{record.exitDate}</td>
                  <td className="px-6 py-4 text-gray-700">{record.archiveDate}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-all duration-200"
                    >
                      👁️ View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {archivedRecords.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="text-gray-400 text-5xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived records found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* View Student Info Modal */}
      <ViewStudentInfoModal 
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

export default ArchiveSearch;