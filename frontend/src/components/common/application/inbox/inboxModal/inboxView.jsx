import React, { useState } from "react";

const InboxView = ({ applicant, onClose, onProceedToScreening }) => {
  const [closing, setClosing] = useState(false);
  const [proceeding, setProceeding] = useState(false);

  if (!applicant) return null;

  // ✅ Fade-out before actually closing
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 250);
  };

  // ✅ Proceed to Screening handler
  const handleProceed = async () => {
    if (proceeding) return;
    setProceeding(true);

    try {
      await onProceedToScreening(applicant);
      handleClose(); // only close if success
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setProceeding(false);
    }
  };

  // ✅ Determine required documents based on student type
const getRequiredDocuments = (type) => {
  if (!type) return ["No required documents specified."];
  const t = type.toLowerCase();

  if (t === "new student" || t === "new") {
    return [
      "Birth Certificate",
      "Report Card",
      "Good Moral Certificate",
      "Certificate of Completion",
      "Form 137",
    ];
  } else if (t === "old student" || t === "old") {
    return ["Report Card"];
  } else if (t === "transferee" || t === "transfer" || t === "transferree") {
    return [
      "Good Moral Certificate",
      "Birth Certificate",
      "Certificate of Completion",
      "Form 137",
    ];
  } else if (t === "returnee" || t === "return") {
    return [
      "Report Card",
    ];
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
        {/* Header */}
        <div className="flex justify-between items-center bg-yellow-400 text-black dark:text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">
            Applicant Details – {applicant.lastName}, {applicant.firstName}{" "}
            {applicant.middleInitial}.
          </h2>
          <button
            onClick={handleClose}
            className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col p-6 space-y-4 text-black dark:text-white">
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-2">
              {[
                {
                  label: "Student Name",
                  value: `${applicant.lastName}, ${applicant.firstName} ${applicant.middleInitial}.`,
                },
                { label: "Birthdate", value: applicant.birthdate },
                { label: "Mother Tongue", value: applicant.motherTongue },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block font-semibold text-sm mb-1">
                    {item.label}
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Student Type", value: applicant.studentType },
                  { label: "Grade Level", value: applicant.grade },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">
                      {item.label}
                    </label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Age", value: applicant.age },
                  { label: "Gender", value: applicant.gender },
                  { label: "Birth Place", value: applicant.birthPlace },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">
                      {item.label}
                    </label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Nationality", value: applicant.nationality },
                  { label: "Religion", value: applicant.religion },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block font-semibold text-sm mb-1">
                      {item.label}
                    </label>
                    <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label className="block font-semibold text-sm mb-1">
              Full Address
            </label>
            <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
              {applicant.address}
            </p>
          </div>

          {/* Parent / Guardian Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">
              Parent / Guardian Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Name", value: applicant.guardian },
                { label: "Relationship", value: applicant.relationship },
                { label: "Contact Number", value: applicant.contact },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block font-semibold text-sm mb-1">
                    {item.label}
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents & Buttons */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-stretch">
            {/* Required Documents */}
<div className="flex flex-col gap-2 flex-1 min-w-[300px]">
  <h3 className="text-sm font-semibold">Required Documents</h3>
  {getRequiredDocuments(applicant.studentType).map((doc, idx) => (
    <p
      key={idx}
      className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 w-full md:w-[365px] 
                 bg-gray-50 dark:bg-slate-700 text-sm text-gray-400 italic 
                 dark:text-gray-300"
    >
      {doc}
    </p>
  ))}
</div>


            <div className="flex flex-col gap-2 justify-end items-end mt-2 md:mt-0">
              <button
                className="w-[190px] px-4 py-2 rounded bg-red-600 text-black font-semibold hover:bg-red-700 transition"
                onClick={() => alert("Pending: Reject Application Action")}
              >
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

      {/* Tailwind Animations */}
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
