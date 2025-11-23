import React from 'react';

const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">Scheduled for OTC Payment</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.scheduledOTC}</p>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">GCash Payments to Confirm</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.gcashToConfirm}</p>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">Completed Today</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.completedToday}</p>
      </div>
      
      <div className="bg-[#3C2F2F] dark:bg-slate-800 p-4 rounded-lg border border-[#3C2F2F] dark:border-slate-700">
        <h3 className="text-white dark:text-white font-semibold">Total Enrolled</h3>
        <p className="text-2xl font-bold text-white dark:text-white">{summary.totalEnrolled}</p>
      </div>
    </div>
  );
};

export default SummaryCards;