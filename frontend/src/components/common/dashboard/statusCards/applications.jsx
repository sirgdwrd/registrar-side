import React, { useState, useEffect } from "react";
import { Inbox } from "lucide-react";

const API_BASE =
  "http://localhost/registrar-gca-main/backend/api/dashboard/applications.php"; // SSE endpoint

const Applications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState("..."); // show ... while loading

  useEffect(() => {
    setIsVisible(true);

    const evtSource = new EventSource(API_BASE);

    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCount(data.pending_applications ?? 0);
      console.log("Live pending applications:", data.pending_applications);
    };

    evtSource.onerror = () => {
      console.error("SSE connection error");
      evtSource.close();
    };

    return () => evtSource.close(); // cleanup on unmount
  }, []);

  return (
    <div
      className={`relative group flex justify-between items-center
        bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700
        rounded-lg p-4 shadow-md flex-1 min-w-[200px] cursor-pointer
        transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
        hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-100`}
    >
      <div className="flex flex-col">
        <span className="text-black dark:text-white text-sm font-semibold">
          Pending Applications
        </span>
        <span className="text-black dark:text-white text-2xl font-extrabold">
          {count}
        </span>
      </div>

      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center
        bg-[#F3D67D] dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-inner"
      >
        <Inbox size={22} />
      </div>

      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1
        opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-500 ease-out whitespace-nowrap z-10"
      >
        View Pending Applications
      </div>
    </div>
  );
};

export default Applications;
