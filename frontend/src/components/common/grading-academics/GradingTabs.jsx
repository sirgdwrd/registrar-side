import React, { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import FinancialHolds from "./FinancialHolds/index";
import GradeApproval from "./GradeApproval/index";
import ReportCards from "./ReportCards/index";
import AcademicArchiving from "./AcademicArchiving/index";
import ArchiveViewer from "./AcademicArchiving/ArchiveViewer/index"; // New tab

const GradingTabs = () => {
  const [activeTab, setActiveTab] = useState("financial-holds");

  const tabs = [
    { id: "financial-holds", label: "Financial Holds" },
    { id: "grade-approval", label: "Grade Approval" },
    { id: "report-cards", label: "Report Cards" },
    { id: "academic-archiving", label: "Academic Archiving" },
    { id: "archive-viewer", label: "Archive Viewer" }, // New tab
  ];

  return (
    <div className="w-full">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="underline"
      />

      <div className="py-4">
        {activeTab === "financial-holds" && <FinancialHolds />}
        {activeTab === "grade-approval" && <GradeApproval />}
        {activeTab === "report-cards" && <ReportCards />}
        {activeTab === "academic-archiving" && <AcademicArchiving />}
        {activeTab === "archive-viewer" && <ArchiveViewer />} {/* New tab */}
      </div>
    </div>
  );
};

export default GradingTabs;
