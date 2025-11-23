import React, { useState, useEffect, useMemo, useRef } from "react";
import { FileCheck } from "lucide-react";
import ScreeningModal from "../screeningModal/screeningModal";

const ScreeningTable = ({ filterOptions = {}, onValidated }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [removingIds, setRemovingIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevDataRef = useRef(null);

  const API_BASE = "http://localhost/registrar-gca-main/backend/api/applicants";

  // Fetch applicants
  const fetchApplicants = async () => {
    try {
      const res = await fetch(`${API_BASE}/getScreeningApplicants.php`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.success) {
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data.data)) {
          setApplicants(data.data);
          prevDataRef.current = data.data;
        }
        setError(null);
      } else {
        setApplicants([]);
        setError(data.message || "No screening applicants found.");
      }
    } catch (err) {
      setApplicants([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    const interval = setInterval(fetchApplicants, 4000);
    return () => clearInterval(interval);
  }, []);

  // Validate applicant
  const handleValidateApplicant = async (applicant) => {
    try {
      const res = await fetch(`${API_BASE}/validateApplicant.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantId: applicant.id }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Validation failed");

      setRemovingIds((prev) => [...prev, applicant.id]);
      setTimeout(() => {
        setApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
        setRemovingIds((prev) => prev.filter((id) => id !== applicant.id));
      }, 300);

      onValidated?.(result.data);
      setSelectedApplicant(null);
    } catch (err) {
      console.error("Error validating applicant:", err);
      alert(`Error validating applicant: ${err.message}`);
    }
  };

  // Color mapper
  const getColorClass = (color) => {
    const map = {
      green: "bg-green-400 text-black dark:text-white dark:bg-green-600",
      yellow: "bg-yellow-300 text-black dark:text-black dark:bg-yellow-400",
      red: "bg-red-500 text-white dark:bg-red-600",
      blue: "bg-blue-400 text-black dark:text-white dark:bg-blue-600",
      indigo: "bg-indigo-400 text-black dark:text-white dark:bg-indigo-600",
    };
    return map[color] || map.yellow;
  };

  // Required documents
  const getRequiredDocuments = (type) => {
    if (!type) return [];
    const t = type.toLowerCase();
    if (t.includes("new"))
      return [
        "Birth Certificate",
        "Report Card",
        "Good Moral Certificate",
        "Certificate of Completion",
        "Form 137",
      ];
    if (t.includes("old")) return ["Report Card"];
    if (t.includes("transf"))
      return [
        "Good Moral Certificate",
        "Birth Certificate",
        "Certificate of Completion",
        "Form 137",
      ];
    if (t.includes("return")) return ["Report Card"];
    return [];
  };

  // Row animation class
  const getRowClass = (id) =>
    removingIds.includes(id)
      ? "transition-all duration-300 opacity-0 max-h-0 overflow-hidden"
      : "transition-all duration-300 opacity-100 max-h-[200px]";

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    const { documentStatus, studentType } = filterOptions || {};

    return applicants.filter((a) => {
      const requiredDocs = getRequiredDocuments(a.studentType);
      const submittedDocs = a.documents || [];
      const totalDocs = requiredDocs.length;
      const receivedCount = submittedDocs.filter((doc) =>
        requiredDocs.includes(doc)
      ).length;

      let docStatus = "";
      if (receivedCount === totalDocs && totalDocs > 0) docStatus = "All Received";
      else if (receivedCount === 0) docStatus = "Missing";
      else docStatus = `${totalDocs - receivedCount} Requested`;

      if (
        documentStatus &&
        documentStatus !== "All Status" &&
        docStatus !== documentStatus
      )
        return false;
      if (studentType && studentType !== "All Types" && a.studentType !== studentType)
        return false;

      return true;
    });
  }, [applicants, filterOptions]);

  if (loading) return <p className="text-center mt-5">Loading screening applicants...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;
  if (filteredApplicants.length === 0)
    return <p className="text-center mt-5">No screening applicants found.</p>;

  return (
    <>
      <div
        className="mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 overflow-auto opacity-0 transform translate-y-5"
        style={{ animation: "tableFadeSlide 0.6s forwards" }}
      >
        <table className="min-w-[600px] sm:min-w-full border-collapse w-full table-fixed">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-400 dark:border-slate-500">
              {[
                "Applicant Name",
                "Student Type",
                "Required Documents",
                "Document Status",
                "Profile Status",
                "Actions",
              ].map((title) => (
                <th
                  key={title}
                  className={`px-4 py-3 ${
                    ["Document Status", "Profile Status", "Actions"].includes(title)
                      ? "text-center"
                      : "text-left"
                  } text-sm font-semibold text-gray-800 dark:text-white ${
                    title === "Required Documents" ? "max-w-[200px] break-words" : ""
                  }`}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredApplicants.map((a) => {
              const requiredDocs = getRequiredDocuments(a.studentType);
              const submittedDocs = a.documents || [];
              const totalDocs = requiredDocs.length;
              const receivedCount = submittedDocs.filter((doc) =>
                requiredDocs.includes(doc)
              ).length;

              let docStatus = "";
              let docColor = "";
              if (receivedCount === totalDocs && totalDocs > 0) {
                docStatus = "All Received";
                docColor = "green";
              } else if (receivedCount === 0) {
                docStatus = "Missing";
                docColor = "red";
              } else {
                docStatus = `${totalDocs - receivedCount} Requested`;
                docColor = "yellow";
              }

              const type = a.studentType?.toLowerCase() || "";
              let profileStatus = "Pending";
              let profileColor = "yellow";
              if (type.includes("new")) {
                profileStatus = "New Profile Created";
                profileColor = "yellow";
              } else if (type.includes("return")) {
                profileStatus = "Profile Reactivated";
                profileColor = "blue";
              } else if (type.includes("transf")) {
                profileStatus = "Profile Transferred";
                profileColor = "indigo";
              }

              return (
                <tr
                  key={a.id}
                  className={`border-b border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 ${getRowClass(
                    a.id
                  )}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{`${a.lastName}, ${a.firstName} ${a.middleInitial}.`}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{a.studentType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-words max-w-[200px]">
                    {requiredDocs.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getColorClass(
                        docColor
                      )}`}
                    >
                      {docStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getColorClass(
                        profileColor
                      )}`}
                    >
                      {profileStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center relative">
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => setSelectedApplicant(a)}
                        onMouseEnter={() => setHoveredId(`screen-${a.id}`)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="inline-flex items-center gap-2 border border-gray-400 text-sm text-black dark:text-white px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4" />
                        Screen
                      </button>
                      {hoveredId === `screen-${a.id}` && (
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                          Screen applicant details
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedApplicant && (
        <ScreeningModal
          key={selectedApplicant.id}
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onValidate={handleValidateApplicant}
        />
      )}

      <style>
        {`
          @keyframes tableFadeSlide {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default ScreeningTable;
