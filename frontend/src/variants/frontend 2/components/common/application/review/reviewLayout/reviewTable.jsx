import React, { useState } from "react";

const ReviewTable = ({
  applicants = [],
  selectedFinalRows = [],
  toggleFinalRow = () => {},
}) => {
  const sampleApplicants = [
    {
      id: 1,
      lastName: "Santos",
      firstName: "Maria",
      middleInitial: "A",
      paymentMethod: "Cash",
      requirements: "Pending",
      studentType: "New Student",
      status: "Validated",
    },
    {
      id: 2,
      lastName: "Dela Cruz",
      firstName: "Juan",
      middleInitial: "B",
      paymentMethod: "Installment",
      requirements: "Complete",
      studentType: "Transferee",
      status: "Validated",
    },
  ];

  const rows = applicants.length
    ? applicants.map((a, i) => ({ ...a, id: i + 1 }))
    : sampleApplicants;

  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredHeader, setHoveredHeader] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const isSelected = (id) => selectedRows.includes(id);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    toggleFinalRow(id);
  };

  const toggleSelectAll = (checked) => {
    setSelectedRows(checked ? rows.map((r) => r.id) : []);
  };

  return (
    <>
      {/* === Animation Style === */}
      <style>
        {`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-up {
            animation: slide-up 0.6s ease-out forwards;
          }
        `}
      </style>

     {/* === Table Container with Animation === */}
<div
  className="mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 overflow-visible animate-slide-up"
>
  {/* ✅ Horizontal Scroll Wrapper */}
  <div className="rounded-2xl overflow-x-auto">
    <table className="min-w-[900px] w-full border-collapse relative overflow-visible z-10">
      {/* Header */}
      <thead>
        <tr className="bg-gray-100 dark:bg-slate-700 text-left border-b border-gray-400 dark:border-slate-500">
          <th className="px-4 py-3 w-12 text-center relative overflow-visible">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={
                  selectedRows.length === rows.length && rows.length > 0
                }
                onChange={(e) => toggleSelectAll(e.target.checked)}
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
            Payment Method
          </th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
            Requirements
          </th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
            Student Type
          </th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
            Section Assignment
          </th>
          <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">
            Status
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {rows.map((a, index) => (
          <tr
            key={a.id}
            className={`transition-colors duration-150 border-b border-gray-400 dark:border-slate-600
              ${isSelected(a.id)
                ? "bg-[#F8C471] dark:bg-[#C29134]"
                : "hover:bg-gray-50 dark:hover:bg-slate-700"
              }
              ${index === rows.length - 1 ? "rounded-b-xl" : ""}
            `}
          >
            {/* Checkbox */}
            <td className="px-4 py-3 text-center relative overflow-visible">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isSelected(a.id)}
                  onChange={() => toggleRow(a.id)}
                  onMouseEnter={() => setHoveredId(a.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                />
                {hoveredId === a.id && (
                  <span className="absolute left-full ml-2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                    Select
                  </span>
                )}
              </div>
            </td>

            {/* Name */}
            <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
              {a.lastName}, {a.firstName} {a.middleInitial}
            </td>

            {/* Payment Method */}
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
              {a.paymentMethod || "Cash"}
            </td>

            {/* Requirements */}
            <td className="px-4 py-3 text-sm">
              <span
                className={`px-2 py-1 rounded-md ${
                  a.requirements?.toLowerCase() === "complete"
                    ? "bg-green-500 text-white"
                    : a.requirements?.toLowerCase() === "incomplete"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 dark:text-black"
                }`}
              >
                {a.requirements || "Pending"}
              </span>
            </td>

            {/* Student Type */}
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
              {a.studentType}
            </td>

            {/* Section Assignment */}
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
              <select className="w-48 px-2 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-yellow-400 transition">
                <option>Assign Section</option>
                <option>Grade 1 - Morning</option>
                <option>Grade 1 - Afternoon</option>
                <option>Grade 2 - Morning</option>
                <option>Grade 2 - Afternoon</option>
              </select>
            </td>

            {/* Status */}
            <td className="px-4 py-3 text-center">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  isSelected(a.id)
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white dark:bg-blue-500"
                }`}
              >
                {a.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </>
  );
};

export default ReviewTable;
