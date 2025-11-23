import React, { useState } from "react"; // Removed useEffect
import TransferCredentialsModal from "./TransferCredentialsModal";

const TransferCredentials = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    transferStatus: "all",
    gradeLevel: "all",
    requestDate: "all",
  });

  const students = [
    {
      id: 1,
      name: "Abuel, Kristine M.",
      studentId: "GCA-2025-004",
      gradeLevel: "Grade 2",
      newSchool: "St. Mary's Academy",
      requestDate: "Oct 16, 2025",
      status: "Requested",
    },
    {
      id: 2,
      name: "Abella, John T.",
      studentId: "GCA-2025-006",
      gradeLevel: "Grade 3",
      newSchool: "St. John's Academy",
      requestDate: "Oct 16, 2025",
      status: "Requested",
    },
    {
      id: 3,
      name: "Bordallo, Angelo J.",
      studentId: "GCA-2025-011",
      gradeLevel: "Grade 4",
      newSchool: "Manila Science High",
      requestDate: "Oct 20, 2025",
      status: "Pending",
    },
    {
      id: 4,
      name: "Cruz, Catherine S.",
      studentId: "GCA-2025-017",
      gradeLevel: "Grade 6",
      newSchool: "QC Science High",
      requestDate: "Oct 21, 2025",
      status: "Ready for Pickup",
    },
  ];

  const handleSelectAll = (e) => {
    setSelectedStudents(e.target.checked ? students.map((s) => s.id) : []);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleExportList = () => console.log("Exporting list...");
  const handleProcessSelected = () => {
    if (selectedStudents.length === 0) {
      console.log("Please select at least one student");
      return;
    }
    console.log(`Processing ${selectedStudents.length} credential(s)`);
  };

  const handlePrepareCredentials = (studentId) =>
    console.log(`Preparing credentials for ${studentId}`);
  const handleCompleteTransfer = (studentId) =>
    console.log(`Completing transfer for ${studentId}`);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Requested: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      Pending: "bg-orange-100 text-orange-800 border border-orange-300",
      "Ready for Pickup": "bg-green-100 text-green-800 border border-green-300",
      Completed: "bg-blue-100 text-blue-800 border border-blue-300",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border border-gray-300";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      {/* Main container with fade-in animation */}
      <div className="max-w-7xl mx-auto animate-fadeIn">
        {/* Header Section with Dark Brown Bar */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-6 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Transfer Credentials Management
          </h2>

          {/* Dark Brown Header Bar - Matching EnrollmentReports */}
          <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-xl">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">
                Transfer Status:
              </label>
              <select
                value={filters.transferStatus}
                onChange={(e) =>
                  handleFilterChange("transferStatus", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="requested">Requested</option>
                <option value="pending">Pending</option>
                <option value="ready-for-pickup">Ready for Pickup</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">
                Grade Level:
              </label>
              <select
                value={filters.gradeLevel}
                onChange={(e) =>
                  handleFilterChange("gradeLevel", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Grades</option>
                <option value="grade-1">Grade 1</option>
                <option value="grade-2">Grade 2</option>
                <option value="grade-3">Grade 3</option>
                <option value="grade-4">Grade 4</option>
                <option value="grade-5">Grade 5</option>
                <option value="grade-6">Grade 6</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-bold">
                Request Date:
              </label>
              <select
                value={filters.requestDate}
                onChange={(e) =>
                  handleFilterChange("requestDate", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">
              Pending Transfers
            </h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">
              5
            </p>
            <p className="text-sm text-gray-600 font-medium">Students</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">
              Credentials Generated
            </h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">
              12
            </p>
            <p className="text-sm text-gray-600 font-medium">This Month</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <h3 className="text-gray-600 text-sm font-bold mb-2 tracking-wide uppercase">
              Average Processing Time
            </h3>
            <p className="text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform">
              2
            </p>
            <p className="text-sm text-gray-600 font-medium">Days</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-x-auto hover:shadow-2xl transition-all duration-300">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      students.length > 0 &&
                      selectedStudents.length === students.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Student ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Grade Level
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  New School
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Request Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleRowClick(student)}
                  className="hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                >
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
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
                    {student.newSchool}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {student.requestDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                        student.status
                      )} shadow-sm`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2">
                      {student.status === "Requested" ||
                      student.status === "Pending" ? (
                        <button
                          onClick={() =>
                            handlePrepareCredentials(student.studentId)
                          }
                          className="px-3 py-1.5 text-xs font-semibold bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                        >
                          📄 Prepare
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleCompleteTransfer(student.studentId)
                          }
                          className="px-3 py-1.5 text-xs font-semibold bg-green-100 hover:bg-green-200 text-green-700 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                        >
                          ✓ Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {students.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md mt-6">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No transfer requests found
            </h3>
            <p className="text-gray-600">
              No pending credential requests at the moment.
            </p>
          </div>
        )}
      </div>

      {/* ===================== MODAL ===================== */}
      <TransferCredentialsModal
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

export default TransferCredentials;
