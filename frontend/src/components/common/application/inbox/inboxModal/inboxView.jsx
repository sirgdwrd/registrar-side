import React, { useState } from "react";

const InboxView = ({ applicant, onClose, onProceedToScreening }) => {
  const [closing, setClosing] = useState(false);
  const [proceeding, setProceeding] = useState(false);

  if (!applicant) return null;

  // Convert empty values to "—"
  const fieldValue = (value) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "number") return value.toString();
    if (typeof value === "string" && value.trim() !== "") return value;
    return "—";
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 250);
  };

  const handleProceed = async () => {
    if (proceeding) return;
    setProceeding(true);

    try {
      await onProceedToScreening(applicant);
      handleClose();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setProceeding(false);
    }
  };

  const getRequiredDocuments = (type) => {
    if (!type) return ["No required documents specified."];
    const t = type.toLowerCase();

    if (t === "new student" || t === "new") {
      return ["Birth Certificate", "Report Card", "Good Moral Certificate", "Certificate of Completion", "Form 137"];
    } else if (t === "old student" || t === "old") {
      return ["Report Card"];
    } else if (t === "transferee" || t === "transfer" || t === "transferree") {
      return ["Good Moral Certificate", "Birth Certificate", "Certificate of Completion", "Form 137"];
    } else if (t === "returnee" || t === "return") {
      return ["Report Card"];
    } else {
      return ["No required documents specified."];
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-auto bg-black/40 transition-opacity ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-white dark:bg-slate-800 max-w-[1200px] w-[90%] rounded-lg shadow-md border border-gray-200 dark:border-slate-600 flex flex-col max-h-[95vh] overflow-y-auto animate-fade-in">
        
        {/* HEADER */}
        <div className="flex justify-between items-center bg-yellow-400 text-black dark:text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">
            Applicant Details – {fieldValue(applicant.StudentLastName)}, {fieldValue(applicant.StudentFirstName)} {fieldValue(applicant.StudentMiddleName)}.
          </h2>
          <button onClick={handleClose} className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition">
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col p-6 space-y-4 text-black dark:text-white">

          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT COLUMN */}
            <div className="space-y-2">
              {[
                { label: "Student Name", value: `${fieldValue(applicant.StudentLastName)}, ${fieldValue(applicant.StudentFirstName)} ${fieldValue(applicant.StudentMiddleName)}.` },
                { label: "Birthdate", value: fieldValue(applicant.DateOfBirth) },
                { label: "Birthplace", value: fieldValue(applicant.birthPlace) },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block font-semibold text-sm mb-1">{item.label}</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Student Type", value: fieldValue(applicant.EnrolleeType) },
                  { label: "Grade Level", value: fieldValue(applicant.ApplyingForGradeLevelID) },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">{item.label}</label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Age", value: fieldValue(applicant.age) },
                  { label: "Gender", value: fieldValue(applicant.Gender) },
                  { label: "Nationality", value: fieldValue(applicant.nationality) },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">{item.label}</label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Mother Tongue", value: fieldValue(applicant.motherTongue) },
                  { label: "Religion", value: fieldValue(applicant.religion) },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">{item.label}</label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block font-semibold text-sm mb-1">Full Address</label>
            <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
              {fieldValue(applicant.address)}
            </p>
          </div>

          {/* PARENT/GUARDIAN */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Parent / Guardian Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[
                { label: "Guardian Name", value: `${fieldValue(applicant.GuardianFirstName)} ${fieldValue(applicant.GuardianLastName)}` },
                { label: "Relationship", value: fieldValue(applicant.GuardianRelationship) },
                { label: "Contact Number", value: fieldValue(applicant.GuardianContact) },
                { label: "Parent's Occupation", value: fieldValue(applicant.GuardianEmail) },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block font-semibold text-sm mb-1">{item.label}</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS + BUTTONS */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-stretch">

            <div className="flex flex-col gap-2 flex-1 min-w-[300px]">
              <h3 className="text-sm font-semibold">Required Documents</h3>

              {getRequiredDocuments(applicant.studentType).map((doc, idx) => (
                <p key={idx} className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 w-full md:w-[365px] bg-gray-50 dark:bg-slate-700 text-sm text-gray-400 italic dark:text-gray-300">
                  {doc}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-2 justify-end items-end">
              <button className="w-[190px] px-4 py-2 rounded bg-red-600 text-black font-semibold hover:bg-red-700 transition">
                Reject Application
              </button>

              <button
                onClick={handleProceed}
                disabled={proceeding}
                className={`w-[190px] px-4 py-2 rounded bg-green-600 text-black font-semibold hover:bg-green-700 transition ${
                  proceeding ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Proceed to Screening
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.25s ease;
          }
        `}
      </style>
    </div>
  );
};

export default InboxView;
