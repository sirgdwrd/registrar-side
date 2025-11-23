import React, { useState, useEffect } from "react";
import Inbox from "./inbox/inbox.jsx"; 
import Screening from "./screening/screening.jsx"; 
import Review from "./review/review.jsx"; 

const ApplicationTabs = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [animateTabs, setAnimateTabs] = useState(false);

  // Unified applicants state
  const [applicants, setApplicants] = useState({
    inbox: [],
    screening: [],
    review: [],
  });
  // test
  // PRaaacticeee
  // Modal state with type
  const [confirmation, setConfirmation] = useState({
    show: false,
    message: "",
    onConfirm: null,
    type: "check", // "check" | "arrow"
  });

  const tabs = [
    { id: "Inbox", label: "Application Inbox", tooltipText: "View and manage pending applications" },
    { id: "Screening", label: "Application Screening", tooltipText: "Process and screen applicant details" },
    { id: "Review", label: "Sectioning & Final Review", tooltipText: "Assign and finalize accepted applicants" },
  ];

  useEffect(() => {
    setAnimateTabs(true);
  }, []);

  // 📥 Inbox → Screening
  const handleMoveToScreening = (applicant) => {
    setApplicants((prev) => ({
      ...prev,
      inbox: prev.inbox.filter((a) => a.id !== applicant.id),
      screening: [...prev.screening, applicant],
    }));

    // Show confirmation modal with arrow animation
    setConfirmation({
      show: true,
      message: "Applicant sent to screening successfully!",
      onConfirm: () => setActiveTab("Screening"),
      type: "arrow",
    });
  };

  // Screening → Review
  const handleValidatedApplicant = (updatedApplicant) => {
    setApplicants((prev) => ({
      ...prev,
      screening: prev.screening.filter((a) => a.id !== updatedApplicant.id),
      review: [...prev.review, updatedApplicant],
    }));

    // Show confirmation modal with check animation
    setConfirmation({
      show: true,
      message: "Applicant successfully validated!",
      onConfirm: () => setActiveTab("Review"),
      type: "check",
    });
  };

  // Tab renderer
  const renderContent = () => {
    switch (activeTab) {
      case "Inbox":
        return <Inbox applicants={applicants.inbox} onProceedToScreening={handleMoveToScreening} />;
      case "Screening":
        return <Screening screeningApplicants={applicants.screening} onValidated={handleValidatedApplicant} />;
      case "Review":
        return <Review reviewApplicants={applicants.review} />;
      default:
        return <Inbox applicants={applicants.inbox} onProceedToScreening={handleMoveToScreening} />;
    }
  };

  return (
    <>
      {/* Inline keyframes */}
      <style>
        {`
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }

          @keyframes drawCheck { to { stroke-dashoffset: 0; } }
          @keyframes drawArrow { to { stroke-dashoffset: 0; } }
          @keyframes drawArrowHead { to { stroke-dashoffset: 0; } }
        `}
      </style>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md w-full transition-colors duration-300">
        {/* Tabs */}
        <div className="flex gap-8 mb-6 relative">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-col items-center relative group transition-all duration-700 ${
                animateTabs ? "animate-slideDown" : "opacity-0"
              }`}
            >
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-sm font-semibold py-2 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                  bg-gray-900 text-white text-xs font-semibold rounded-md px-2 py-1 
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-300 ease-in-out whitespace-nowrap z-10"
              >
                {tab.tooltipText}
              </span>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">{renderContent()}</div>
      </div>

      {/* ✅ Confirmation Modal */}
      {confirmation.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 w-[420px] text-center">
            
            {/* Conditional Modal Content */}
            {confirmation.type === "check" ? (
              <div className="flex flex-col items-center gap-4">
                {/* Check Animation */}
                <div className="w-24 h-24">
                  <svg className="w-24 h-24 stroke-green-500" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" stroke="#d1d5db" strokeWidth="2"/>
                    <path
                      color='green'
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 27l7 7 17-17"
                      style={{ strokeDasharray: 50, strokeDashoffset: 50, animation: "drawCheck 0.6s forwards 0.3s" }}
                    />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                  {confirmation.message}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Do you want to go to the Sectioning and Final Review page?
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
               {/* Arrow Animation */}
                   <div className="w-24 h-24">
                      <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        {/* Line */}
                        <line
                          x1="4"
                          y1="12"
                          x2="20"
                          y2="12"
                          strokeWidth="3"
                          stroke="currentColor"
                          strokeLinecap="round"
                          style={{ strokeDasharray: 16, strokeDashoffset: 16, animation: "drawArrow 0.2s forwards" }}
                        />
                        {/* Arrow Head */}
                        <polyline
                          points="14,6 20,12 14,18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: "drawArrowHead 0.2s forwards 0.2s" }}
                        />
                      </svg>
                    </div>
                <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                  {confirmation.message}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Proceed to Application Screening page?
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setConfirmation({ show: false, message: "", onConfirm: null, type: "check" });
                  confirmation.onConfirm && confirmation.onConfirm();
                }}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium text-base hover:bg-blue-700 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmation({ show: false, message: "", onConfirm: null, type: "check" })}
                className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-medium text-base hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
              >
                No
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationTabs;