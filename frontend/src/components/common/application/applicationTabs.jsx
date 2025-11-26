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

    // Stay on the current tab (no tab switch)
    // Just perform the action, and the page stays the same
  };

  // Screening → Review
  const handleValidatedApplicant = (updatedApplicant) => {
    setApplicants((prev) => ({
      ...prev,
      screening: prev.screening.filter((a) => a.id !== updatedApplicant.id),
      review: [...prev.review, updatedApplicant],
    }));

    // Stay on the current tab (no tab switch)
    // Just perform the action, and the page stays the same
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
      <style>
        {`
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        `}
      </style>

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
    </>
  );
};

export default ApplicationTabs;
