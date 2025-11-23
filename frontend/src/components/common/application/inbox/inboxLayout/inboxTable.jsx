import React, { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";
import InboxView from "../inboxModal/inboxView";

const InboxTable = ({ filtersState = {}, onProceedToScreening }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredHeader, setHoveredHeader] = useState(false);
  const [animate, setAnimate] = useState(false);
  const prevDataRef = useRef(null);
  const [removingIds, setRemovingIds] = useState([]);

  const API_BASE = "http://localhost/registrar-gca-main/backend/api/applicants";

  // Fetch applicants from backend
  const fetchApplicants = async () => {
    try {
      const response = await fetch(`${API_BASE}/getApplicants.php`);
      if (!response.ok) throw new Error("Failed to fetch applicants");

      const result = await response.json();
      if (result.success) {
        const newData = result.data;
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(newData)) {
          setApplicants(newData);
          prevDataRef.current = newData;
        }
        setError(null);
      } else {
        throw new Error(result.message || "Failed to fetch applicants");
      }
    } catch (err) {
      setError(err.message);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    const interval = setInterval(fetchApplicants, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => setAnimate(true), []);

  // Row selection
  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const isSelected = (id) => selectedRows.includes(id);
  const toggleSelectAll = (checked) =>
    setSelectedRows(checked ? applicants.map((a) => a.id) : []);

  // Proceed to Screening
  const handleProceedToScreening = async (applicant) => {
    try {
      setRemovingIds((prev) => [...prev, applicant.id]);

      const response = await fetch(`${API_BASE}/updateStage.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantId: applicant.id }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Update failed");

      setTimeout(() => {
        setApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
        setRemovingIds((prev) => prev.filter((id) => id !== applicant.id));
      }, 300);

      if (onProceedToScreening) onProceedToScreening(applicant);
    } catch (err) {
      alert(`Error updating stage: ${err.message}`);
    }
  };

  // --- Filtered applicants ---
  const filteredApplicants = applicants.filter((a) => {
    const studentTypeFilter = filtersState["Student Type"] || "All Types";
    const dateFilter = filtersState["Date Submitted"] || "All Dates";
    const gradeFilter = filtersState["Grade Level"] || "All Grades";

    let match = true;
    if (studentTypeFilter !== "All Types") match = match && a.studentType === studentTypeFilter;
    if (gradeFilter !== "All Grades") match = match && a.grade === gradeFilter;
    if (dateFilter !== "All Dates") {
      const applicantDate = new Date(a.created_at);
      const applicantMonthYear = `${applicantDate.toLocaleString('default', { month: 'long' })} ${applicantDate.getFullYear()}`;
      match = match && applicantMonthYear === dateFilter;
    }
    return match;
  });

  if (loading) return <p className="text-center mt-5">Loading applicants...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">Error: {error}</p>;
  if (filteredApplicants.length === 0) return <p className="text-center mt-5">No applicants found.</p>;

  return (
    <div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up { animation: slideUp 0.6s ease-out; }
      `}</style>

      <div className={`mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 overflow-visible ${animate ? "slide-up" : ""}`}>
        <div className="rounded-2xl overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse relative z-10">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700 text-left border-b border-gray-400 dark:border-slate-500">
                <th className="px-4 py-3 w-12 text-center relative">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      checked={selectedRows.length === filteredApplicants.length && filteredApplicants.length > 0}
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
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Applicant Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Student Type</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Grade Level</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Date Submitted</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className={`transition-all duration-300 border-b border-gray-400 dark:border-slate-600
                    ${removingIds.includes(applicant.id) ? "opacity-0" : "opacity-100"}
                    ${isSelected(applicant.id) ? "bg-[#F8C471] dark:bg-[#C29134]" : "hover:bg-gray-50 dark:hover:bg-slate-700"}
                    ${index === filteredApplicants.length - 1 ? "rounded-b-2xl" : ""}
                  `}
                >
                  <td className="px-4 py-3 text-center relative">
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
                    {applicant.lastName}, {applicant.firstName} {applicant.middleInitial}.
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.studentType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.grade}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.created_at}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-300 text-black">
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center relative">
                    <div className="relative flex flex-col items-center gap-2">
                      <button
                        className="inline-flex items-center gap-2 border border-gray-400 text-black dark:text-white px-3 py-1.5 rounded-md text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
                        onClick={() => setSelectedApplicant(applicant)}
                        onMouseEnter={() => setHoveredId(`view-${applicant.id}`)}
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

        {selectedApplicant && (
          <InboxView
            applicant={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
            onProceedToScreening={handleProceedToScreening}
          />
        )}
      </div>
    </div>
  );
};

export default InboxTable;
