import React, { useState, useEffect } from "react";

const InboxView = ({ applicant, onClose }) => {
  const [closing, setClosing] = useState(false);

  if (!applicant) return null;

  // Handle fade-out before actually closing
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 250); // match animation duration
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
        {/* Header */}
        <div className="flex justify-between items-center bg-yellow-400 text-black dark:text-white px-6 py-4">
          <h2 className="text-lg font-semibold">
            Applicant Details – {applicant.lastName}, {applicant.firstName}{" "}
            {applicant.middleInitial}.
          </h2>
          <span
            className="text-2xl cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
            onClick={handleClose}
          >
            &times;
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col p-6 space-y-3 text-black dark:text-white">
          {/* Student Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-1">
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Student Name
                </label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.lastName}, {applicant.firstName}{" "}
                  {applicant.middleInitial}.
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Birthdate
                </label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.birthdate}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Mother Tongue
                </label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.motherTongue}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">
                    Student Type
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.studentType}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">
                    Grade Level
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.grade}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">Age</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.age}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">
                    Gender
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.gender}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">
                    Birth Place
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.birthPlace}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1">
                    Nationality
                  </label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.nationality}
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1">Religion</label>
                  <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                    {applicant.religion}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="w-full mt-4">
            <label className="block font-semibold text-sm mb-1">Full Address</label>
            <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm w-full">
              {applicant.address}
            </p>
          </div>

          {/* Parent Info */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Parent / Guardian Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Parent / Guardian Name
                </label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.guardian}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Relationship</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.relationship}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Contact Number</label>
                <p className="border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm">
                  {applicant.contact}
                </p>
              </div>
            </div>
          </div>

       {/* Bottom Section */}
<div className="flex flex-col md:flex-row justify-start md:justify-between gap-4 mt-2 md:mt-4 items-start md:items-stretch">
  {/* Documents */}
  <div className="flex flex-col gap-2 flex-1 min-w-[300px] justify-start">
    <h3 className="text-sm font-semibold">Required Documents</h3>
    {["Birth Certificate", "Form 137", "Good Moral Certificate"].map(
      (docType, index) => {
        const submitted =
          applicant.documents && applicant.documents.includes(docType);
        const docText = submitted ? docType : `Missing ${docType}`;

        return (
          <p
            key={index}
            className={`border border-gray-400 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 text-sm w-full md:w-[365px] ${
              !submitted ? "text-gray-400 italic dark:text-gray-300" : ""
            }`}
          >
            {docText}
          </p>
        );
      }
    )}
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-2 justify-end items-end mt-2 md:mt-0 self-stretch">
    <div className="flex-1"></div> 
    <button
      className="w-[190px] px-4 py-2 rounded bg-red-600 text-black font-semibold hover:bg-red-700 transition"
      onClick={() => alert('Pending: Reject Application Action')}
    >
      Reject Application
    </button>
    <button
      className="w-[190px] px-4 py-2 rounded bg-green-600 text-black font-semibold hover:bg-green-700 transition"
      onClick={() => alert('Pending: Validate Application Action')}
    >
      Validate Application
    </button>
  </div>
</div>


        </div>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.25s ease;
          }
          .animate-fade-out {
            animation: fade-in 0.25s ease reverse;
          }
        `}
      </style>
    </div>
  );
};

export default InboxView;
