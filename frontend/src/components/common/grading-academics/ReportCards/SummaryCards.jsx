import React from "react";

const SummaryCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">
          Ready to Release
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.readyToRelease}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {Math.round((stats.readyToRelease / stats.totalThisQuarter) * 100)}%
          of students
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">
          Pending Approval
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.pendingApproval}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {Math.round((stats.pendingApproval / stats.totalThisQuarter) * 100)}%
          of students
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-gray-800 dark:text-white font-semibold">
          Released Report Cards
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.releasedReportCards}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {Math.round(
            (stats.releasedReportCards / stats.totalThisQuarter) * 100
          )}
          % of students
        </p>
      </div>

      <div className="bg-[#3C2F2F] dark:bg-slate-800 p-4 rounded-lg border border-[#3C2F2F] dark:border-slate-700">
        <h3 className="text-white dark:text-white font-semibold">
          Total This Quarter
        </h3>
        <p className="text-2xl font-bold text-white dark:text-white">
          {stats.totalThisQuarter}
        </p>
        <p className="text-xs text-amber-200 dark:text-gray-400 mt-1">
          Current enrollment
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
