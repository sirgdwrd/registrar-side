import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const ScreeningFilter = ({ onFilterChange }) => {
  const [visible, setVisible] = useState(false);
  const [documentStatus, setDocumentStatus] = useState("All Status");
  const [studentType, setStudentType] = useState("All Types");

  // Animate fade-in
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Trigger parent callback when filters change
  useEffect(() => {
    onFilterChange?.({ documentStatus, studentType });
    // deliberately not including onFilterChange to avoid re-creation loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentStatus, studentType]);

  const handleReset = () => {
    setDocumentStatus("All Status");
    setStudentType("All Types");
  };

  return (
    <div
      className={`bg-yellow-400 p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-4 transform transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-wrap items-center gap-6">
        {/* Document Status */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-black">
            Document Status:
          </label>
          <div className="relative group">
            <select
              className="px-3 py-2 bg-white text-black text-sm rounded-md border border-gray-300 
                focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-100 
                transition-all duration-200 w-[160px]"
              value={documentStatus}
              onChange={(e) => setDocumentStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>All Received</option>
              <option>1 Requested</option>
              <option>2 Requested</option>
              <option>3 Requested</option>
              <option>4 Requested</option>
              <option>Missing</option>
            </select>

            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs 
                font-semibold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                transition-all duration-300 whitespace-nowrap"
            >
              Select Document Status
            </span>
          </div>
        </div>

        {/* Student Type */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-black">
            Student Type:
          </label>
          <div className="relative group">
            <select
              className="px-3 py-2 bg-white text-black text-sm rounded-md border border-gray-300 
                focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-100 
                transition-all duration-200 w-[160px]"
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
            >
              <option>All Types</option>
              <option>New Student</option>
              <option>Transferee</option>
              <option>Returnee</option>
            </select>

            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs 
                font-semibold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                transition-all duration-300 whitespace-nowrap"
            >
              Select Student Type
            </span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-3 py-2 rounded-md border border-yellow-500
          hover:bg-yellow-100 active:scale-95 transition-all duration-200 ease-out"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Filters
      </button>
    </div>
  );
};

export default ScreeningFilter;
