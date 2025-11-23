import React, { useState } from "react";
import RequestInfo from "./submodal/requestInfo";

const ScreeningModal = ({ applicant, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubModalOpen, setSubModalOpen] = useState(false);

  if (!applicant) return null;

  const fieldValue = (value) => (value && value.trim() !== "" ? value : "—");

  // ✅ Fixed 3 required docs + check from applicant.documents
  const requiredDocs = ["Birth Certificate", "Form 137", "Good Moral Certificate"];

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-auto pt-10 transition-opacity ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white dark:bg-slate-800 max-w-[1200px] w-[90%] rounded-lg shadow-md border border-gray-200 dark:border-slate-600 flex flex-col max-h-[95vh] overflow-y-auto animate-fade-in`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center bg-yellow-400 text-black dark:text-white px-6 py-4">
          <h2 className="text-lg font-semibold">
            Screening – {fieldValue(applicant.lastName)}, {fieldValue(applicant.firstName)}{" "}
            {fieldValue(applicant.middleInitial)}.
          </h2>
          <span
            className="text-2xl cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
            onClick={handleClose}
          >
            &times;
          </span>
        </div>

        {/* BODY */}
        <div className="flex flex-col p-6 space-y-3 text-black dark:text-white">
          {/* Student Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-1">
              <div>
                <label className="block font-semibold text-sm mb-1">Student Name</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(`${applicant.lastName}, ${applicant.firstName} ${applicant.middleInitial}.`)}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Birthdate</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(applicant.birthdate)}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Mother Tongue</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(applicant.motherTongue)}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">Student Type</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.studentType)}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">Grade Level</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.grade)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">Age</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.age)}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">Gender</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.gender)}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">Birth Place</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.birthPlace)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">Nationality</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.nationality)}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">Religion</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {fieldValue(applicant.religion)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="w-full mt-4">
            <label className="block font-semibold text-sm mb-1">Full Address</label>
            <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm w-full">
              {fieldValue(applicant.address)}
            </p>
          </div>

          {/* Parent Info */}
          <div>
           
            <h3 className="text-sm font-semibold mb-1">Parent / Guardian Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold text-sm mb-1">Parent / Guardian Name</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(applicant.guardian)}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Relationship</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(applicant.relationship)}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Contact Number</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {fieldValue(applicant.contact)}
                </p>
              </div>
            </div>
          </div>

    {/* Screening Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
  {/* ✅ Required Documents */}
  <div>
    <h3 className="text-sm font-semibold mb-2">Required Documents</h3>
    <div className="flex flex-col gap-2">
      {requiredDocs.map((doc, i) => {
        const received = applicant.documents?.includes(doc);
        return (
          <div
            key={i}
            className="flex justify-between items-center border border-gray-400 dark:border-gray-600 
                       rounded px-2.5 py-1.5 bg-gray-50 dark:bg-slate-700"
          >
            <span className="text-sm font-medium">{doc}</span>
            <span
              className={`px-3 py-1 rounded text-xs font-semibold ${
                received ? "w-20 bg-green-500 text-black" : "bg-yellow-400 text-black"
              }`}
            >
              {received ? "Received" : "Requested"}
            </span>
          </div>
        );
      })}
    </div>
  </div>

  {/* 🗒️ Registrar Notes */}
  <div>
    <h3 className="text-sm font-semibold mb-2">Registrar Notes</h3>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Add notes about this application"
      className="w-full h-[120px] border border-gray-400 dark:border-gray-600 rounded 
                 px-3 py-2 bg-white dark:bg-slate-700 text-sm text-black dark:text-white resize-none"
    ></textarea>
  </div>

  {/* Buttons */}
  <div className="flex flex-col items-end">
    <h3 className="text-sm font-semibold mb-2 invisible">Actions</h3>
    <div className="flex flex-col gap-2">
      <button
        className="w-[190px] px-3.5 py-1.5 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        onClick={() => setSubModalOpen(true)}
      >
        Request More Info
      </button>
      <button
        className="w-[190px] px-3.5 py-1.5 rounded bg-red-600 text-black font-semibold hover:bg-red-700 transition"
      >
        Reject
      </button>
      <button
        className="w-[190px] px-3.5 py-1.5 rounded bg-green-600 text-black font-semibold hover:bg-green-700 transition"
      >
        Validate
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
      
{/* Request Info Submodal with dark mode support */}
      <RequestInfo isOpen={isSubModalOpen} onClose={() => setSubModalOpen(false)} />

      {/* Animation */}
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

export default ScreeningModal;
