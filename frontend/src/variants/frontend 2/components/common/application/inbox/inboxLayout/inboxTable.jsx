import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import InboxView from "../inboxModal/inboxView";

const InboxTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredHeader, setHoveredHeader] = useState(false);
  const [animate, setAnimate] = useState(false); // ✅ animation trigger

  useEffect(() => {
    setAnimate(true); // trigger slide-up animation
  }, []);

  const applicants = [
    {
      id: 1,
      lastName: "Santos",
      firstName: "Maria",
      middleInitial: "A",
      birthdate: "2008-05-12",
      motherTongue: "Tagalog",
      address: "123 Street, City",
      studentType: "New Student",
      grade: "Grade 3",
      age: 12,
      gender: "Female",
      birthPlace: "City",
      nationality: "Filipino",
      religion: "Christianity",
      guardian: "Juan Santos",
      relationship: "Father",
      contact: "09123456789",
      documents: ["Birth Certificate", "Report Card"],
      status: "Pending",
    },
    {
      id: 2,
      lastName: "Dela Cruz",
      firstName: "Juan",
      middleInitial: "B",
      birthdate: "2009-02-20",
      motherTongue: "Tagalog",
      address: "456 Avenue, City",
      studentType: "Transferee",
      grade: "Grade 2",
      age: 13,
      gender: "Male",
      birthPlace: "City",
      nationality: "Filipino",
      religion: "Christianity",
      guardian: "Maria Dela Cruz",
      relationship: "Mother",
      contact: "09876543210",
      documents: ["Birth Certificate", "Report Card"],
      status: "Pending",
    },
  ];

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  const isSelected = (id) => selectedRows.includes(id);

  const toggleSelectAll = (checked) => {
    setSelectedRows(checked ? applicants.map((a) => a.id) : []);
  };

  return (
    <div>
      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .slide-up { animation: slideUp 0.6s ease-out; }
        `}
      </style>

      {/* Container + Animation */}
      <div
        className={`mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 overflow-visible ${
          animate ? "slide-up" : ""
        }`}
      >
        {/* ✅ Horizontal scroll wrapper for mobile */}
        <div className="rounded-2xl overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse relative z-10">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700 text-left border-b border-gray-400 dark:border-slate-500">
                <th className="px-4 py-3 w-12 text-center relative overflow-visible">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      checked={selectedRows.length === applicants.length}
                      onMouseEnter={() => setHoveredHeader(true)}
                      onMouseLeave={() => setHoveredHeader(false)}
                      className="cursor-pointer"
                    />
                    {hoveredHeader && (
                      <span className="absolute left-full ml-2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                        Select all
                      </span>
                    )}
                  </div>
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Applicant Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Student Type
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Grade Level
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Date Submitted
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className={`transition-colors duration-150 border-b border-gray-400 dark:border-slate-600
                    ${isSelected(applicant.id) ? "bg-[#F8C471] dark:bg-[#C29134]" : "hover:bg-gray-50 dark:hover:bg-slate-700"}
                    ${index === applicants.length - 1 ? "rounded-b-2xl" : ""}`}
                >
                  <td className="px-4 py-3 text-center relative overflow-visible">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isSelected(applicant.id)}
                        onChange={() => toggleRow(applicant.id)}
                        onMouseEnter={() => setHoveredId(applicant.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="cursor-pointer"
                      />
                      {hoveredId === applicant.id && (
                        <span className="absolute left-full ml-2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                          Select
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                    {applicant.firstName} {applicant.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {applicant.studentType}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {applicant.grade}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {applicant.date || applicant.birthdate}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-300 text-black">
                      {applicant.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center relative overflow-visible">
                    <div className="relative flex flex-col items-center">
                      <button
                        className="inline-flex items-center gap-2 border border-gray-400 text-black dark:text-white px-3 py-1.5 rounded-md text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
                        onClick={() => setSelectedApplicant(applicant)}
                        onMouseEnter={() =>
                          setHoveredId(`view-${applicant.id}`)
                        }
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {hoveredId === `view-${applicant.id}` && (
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                          View applicant details
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal stays fixed */}
        {selectedApplicant && (
          <InboxView
            applicant={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
          />
        )}
      </div>
    </div>
  );
};

export default InboxTable;
