import React, { useState } from 'react';
import OverviewDashboard from "../common/reports/overviewDashboard";
import EnrollmentReports from "../common/reports/enrollmentReports";
import AcademicReports from "../common/reports/academicReports";
import FinancialReports from '../common/reports/financialReports';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview Dashboard', component: OverviewDashboard },
    { id: 'enrollment', label: 'Enrollment Reports', component: EnrollmentReports },
    { id: 'academic', label: 'Academic Reports', component: AcademicReports },
    { id: 'financial', label: 'Financial Reports', component: FinancialReports },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 pt-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Reports and Analytics</h1>
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default ReportsPage;