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
  const [showBulkModal, setShowBulkModal] = useState(false);
  const prevDataRef = useRef(null);
  const [removingIds, setRemovingIds] = useState([]);

  const API_BASE = "http://localhost/registrar-gca-main/backend/api/applicants";

  // Fetch applicants
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
    const interval = setInterval(fetchApplicants, 5000);
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
    setSelectedRows(checked ? filteredApplicants.map((a) => a.id) : []);

  // Single Proceed to Screening
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

  // Bulk Proceed to Screening
  const handleBulkProceed = async () => {
    const rowsToProceed = applicants.filter((a) => selectedRows.includes(a.id));
    for (let applicant of rowsToProceed) {
      await handleProceedToScreening(applicant);
    }
    setSelectedRows([]);
    setShowBulkModal(false);
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
              {/* Bulk Proceed button row */}
              <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-400 dark:border-slate-500">
                <th colSpan="7" className="px-4 py-3">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setShowBulkModal(true)}
                      disabled={selectedRows.length === 0}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition
                        ${selectedRows.length > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                      Proceed to Screening ({selectedRows.length})
                    </button>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      Total: {filteredApplicants.length} applicant(s)
                    </span>
                  </div>
                </th>
              </tr>

              {/* Column headers */}
              <tr className="bg-gray-100 dark:bg-slate-700 text-left border-b border-gray-400 dark:border-slate-500">
                <th className="px-4 py-3 w-12 text-center relative">
                  <div className="relative flex items-center justify-center group">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredApplicants.length && filteredApplicants.length > 0}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="cursor-pointer"
                    />
                    {/* Tooltip */}
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
                      Select all
                    </span>
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
                    ${index === filteredApplicants.length - 1 ? "rounded-b-2xl" : ""}`}
                >
                  <td className="px-4 py-3 text-center relative">
                    <div className="relative flex items-center justify-center group">
                      <input
                        type="checkbox"
                        checked={isSelected(applicant.id)}
                        onChange={() => toggleRow(applicant.id)}
                        className="cursor-pointer"
                      />
                      {/* Tooltip */}
                      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
                        Select
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                    {applicant.StudentLastName}, {applicant.StudentFirstName} {applicant.StudentMiddleName}.
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.EnrolleeType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.ApplyingForGradeLevelID}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{applicant.SubmissionDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-300 text-black">{applicant.ApplicationStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-center relative">
                    <div className="relative flex flex-col items-center gap-2 group">
                      <button
                        className="inline-flex items-center gap-2 border border-gray-400 text-black dark:text-white px-3 py-1.5 rounded-md text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      {/* Tooltip */}
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
                        View applicant details
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inbox Modal */}
        {selectedApplicant && (
          <InboxView
            applicant={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
            onProceedToScreening={handleProceedToScreening}
          />
        )}

        {/* Bulk Proceed Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 w-96 text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Proceed to Screening
              </h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Are you sure you want to proceed {selectedRows.length} applicant(s) to screening?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500"
                  onClick={() => setShowBulkModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleBulkProceed}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxTable;
