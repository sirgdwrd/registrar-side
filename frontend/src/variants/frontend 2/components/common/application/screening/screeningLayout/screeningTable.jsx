import React, { useState, useEffect } from "react";
import { FileCheck } from "lucide-react";
import ScreeningModal from "../screeningModal/screeningModal";

const ScreeningTable = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [tableVisible, setTableVisible] = useState(false);

  useEffect(() => {
    setTableVisible(true);
  }, []);

  const handleCloseModal = () => {
    setSelectedApplicant(null);
  };

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
      age: "12",
      gender: "Female",
      birthPlace: "City",
      nationality: "Filipino",
      religion: "Christianity",
      guardian: "Juan Santos",
      relationship: "Father",
      contact: "09123456789",
      documents: ["Birth Certificate", "Report Card"],
      docStatus: "Complete",
      profileStatus: "Pending Retrieval",
      docColor: "green",
      profileColor: "yellow",
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
      age: "13",
      gender: "Male",
      birthPlace: "City",
      nationality: "Filipino",
      religion: "Christianity",
      guardian: "Maria Dela Cruz",
      relationship: "Mother",
      contact: "09876543210",
      documents: ["Birth Certificate", "Report Card"],
      docStatus: "Missing",
      profileStatus: "Profile Reactivated",
      docColor: "red",
      profileColor: "blue",
    },
  ];

  const getColorClass = (type, color) => {
    const map = {
      green: "bg-green-400 text-black dark:text-white dark:bg-green-600",
      yellow: "bg-yellow-300 text-black dark:text-black dark:bg-yellow-400",
      red: "bg-red-500 text-white dark:bg-red-600",
      blue: "bg-blue-400 text-black dark:text-white dark:bg-blue-600",
    };
    return map[color] || "";
  };

  return (
    <>
      {/* Animated Table Container */}
      <div
        className={`mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 relative overflow-auto 
        transform transition-all duration-700 ease-out ${
          tableVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <table className="min-w-[600px] sm:min-w-full border-collapse w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-400 dark:border-slate-500">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Applicant Name
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Student Type
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Required Documents
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Document Status
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Profile Status
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((a) => (
              <tr
                key={a.id}
                className="transition-colors duration-150 border-b border-gray-300 dark:border-slate-600 
                hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-800 dark:text-white">
                  {`${a.lastName}, ${a.firstName} ${a.middleInitial}.`}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {a.studentType}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {a.documents.join(", ")}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-full ${getColorClass(
                      "status",
                      a.docColor
                    )}`}
                  >
                    {a.docStatus}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-full ${getColorClass(
                      "profile",
                      a.profileColor
                    )}`}
                  >
                    {a.profileStatus}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-center relative overflow-visible">
                  <div className="relative flex flex-col items-center">
                    <button
                      onClick={() => setSelectedApplicant(a)}
                      onMouseEnter={() => setHoveredId(`screen-${a.id}`)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="inline-flex items-center gap-1 sm:gap-2 border border-gray-400 text-[10px] sm:text-sm text-black dark:text-white 
                      px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white dark:bg-slate-800 
                      hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
                    >
                      <FileCheck className="w-3 sm:w-4 h-3 sm:h-4" />
                      Screen
                    </button>

                    {hoveredId === `screen-${a.id}` && (
                      <span
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                        bg-black text-white text-xs font-medium rounded-md px-2 py-1 
                        whitespace-nowrap z-[9999]"
                      >
                        Screen applicant details
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal stays outside of animated div */}
      {selectedApplicant && (
        <ScreeningModal
          applicant={selectedApplicant}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ScreeningTable;
