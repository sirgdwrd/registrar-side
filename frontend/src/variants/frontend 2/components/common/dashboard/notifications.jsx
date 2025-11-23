import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animation once the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 
        rounded-2xl p-5 shadow-md flex flex-col gap-3 transition-all duration-500 ease-out transform
        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-extrabold text-black dark:text-white">
          Recent Notifications
        </h3>
        <button className="text-blue-600 font-semibold text-sm hover:underline">
          View All
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex items-start gap-3 py-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center
            bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner text-lg">
            ⚠️
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-black dark:text-white">
              Financial Hold Alert
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
              5 students have unsettled payments before midterm exams.{" "}
              <span className="text-gray-400 dark:text-gray-500">10 mins ago</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center
            bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner text-lg">
            📥
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-black dark:text-white">
              New Application Received
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
              7 new student applications require validation.{" "}
              <span className="text-gray-400 dark:text-gray-500">2 hours ago</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center
            bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner text-lg">
            ✅
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-black dark:text-white">
              Grade Submission Complete
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
              All teachers have submitted Q1 grades for verification.{" "}
              <span className="text-gray-400 dark:text-gray-500">Yesterday</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center
            bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner text-lg">
            ✅
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-black dark:text-white">
              Transfer Request
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
              Maria Santos has requested transfer credentials.{" "}
              <span className="text-gray-400 dark:text-gray-500">2 days ago</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
