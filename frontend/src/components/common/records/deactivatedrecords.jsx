import React, { useState, useEffect } from "react";

import ViewStudentInfoModal from "./ViewStudentInfoModal";

const DeactivatedRecords = () => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    deactivationReason: "all",
    deactivationDate: "all",
    qrStatus: "all",
  });

  // Apply Poppins font for consistency
  useEffect(() => {
    const prev = document.body.style.fontFamily;
    document.body.style.fontFamily = "'Poppins', sans-serif";
    return () => {
      document.body.style.fontFamily = prev || "";
    };
  }, []);

  // Sample deactivated data
  const deactivatedStudents = [
    {
      id: 1,
      studentName: "Abuel, Kristine M.",
      studentId: "GCA-2025-004",
      lastGradeLevel: "Grade 2",
      deactivationReason: "Transfer Out",
      deactivationDate: "Oct 15, 2025",
      qrStatus: "Invalidated",
    },
    {
      id: 2,
      studentName: "Abella, John T.",
      studentId: "GCA-2025-006",
      lastGradeLevel: "Grade 3",
      deactivationReason: "Transfer Out",
      deactivationDate: "Oct 16, 2025",
      qrStatus: "Invalidated",
    },
    {
      id: 3,
      studentName: "Bautista, Angelo J.",
      studentId: "GCA-2025-011",
      lastGradeLevel: "Grade 4",
      deactivationReason: "Graduation",
      deactivationDate: "Oct 20, 2025",
      qrStatus: "Invalidated",
    },
    {
      id: 4,
      studentName: "Cruz, Catherine S.",
      studentId: "GCA-2025-017",
      lastGradeLevel: "Grade 5",
      deactivationReason: "Dropped",
      deactivationDate: "Oct 21, 2025",
      qrStatus: "Invalidated",
    },
  ];

  const handleSelectAll = (e) => {
    setSelectedRecords(
      e.target.checked ? deactivatedStudents.map((s) => s.id) : []
    );
  };

  const handleSelectRecord = (recordId) => {
    setSelectedRecords((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleExportList = () => alert("Exporting list...");

  const handleRestoreSelected = () => {
    if (selectedRecords.length === 0) {
      alert("Please select at least one record");
      return;
    }
    alert(`Restoring ${selectedRecords.length} record(s)`);
  };

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
            Deactivated Student Accounts
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleExportList}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 text-sm font-semibold text-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              📄 Export List
            </button>
            <button
              onClick={handleRestoreSelected}
              className="px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🔄 Restore Selected
            </button>
          </div>
        </div>

        {/* Statistics Cards - Yellow Background */}
        <div className="grid grid-cols-4 gap-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 p-6 rounded-xl mb-6 shadow-sm">
          {[
            { label: "Deactivated This Year", value: "124" },
            { label: "QR Codes Invalidated", value: "12" },
            { label: "Restored This Month", value: "5" },
            { label: "System Cleanup", value: "98.3%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-700 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section - Yellow Background */}
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 p-6 rounded-xl mb-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Deactivation Reason
              </label>
              <select
                value={filters.deactivationReason}
                onChange={(e) =>
                  setFilters({ ...filters, deactivationReason: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Reasons</option>
                <option value="transfer">Transfer Out</option>
                <option value="graduation">Graduation</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Deactivation Date
              </label>
              <select
                value={filters.deactivationDate}
                onChange={(e) =>
                  setFilters({ ...filters, deactivationDate: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                QR Status
              </label>
              <select
                value={filters.qrStatus}
                onChange={(e) =>
                  setFilters({ ...filters, qrStatus: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Statuses</option>
                <option value="invalidated">Invalidated</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedRecords.length === deactivatedStudents.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                </th>
                {[
                  "Student Name",
                  "Student ID",
                  "Last Grade Level",
                  "Deactivation Reason",
                  "Deactivation Date",
                  "QR Status",
                  "Actions",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {deactivatedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(student.id)}
                      onChange={() => handleSelectRecord(student.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {student.studentName}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {student.lastGradeLevel}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {student.deactivationReason}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {student.deactivationDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full">
                      {student.qrStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewRecord(student)}
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
      </div>

      {/* View Student Info Modal */}
      <ViewStudentInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DeactivatedRecords;
