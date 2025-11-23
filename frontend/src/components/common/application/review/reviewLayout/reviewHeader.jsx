import React, { useEffect, useState } from "react";
import { RotateCcw, CheckCheck } from "lucide-react";

const ReviewHeader = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  return (
    <div className="flex items-center justify-between mb-4 overflow-visible">
      {/* Title - slides in from left */}
      <h2
        className={`text-xl font-bold text-black dark:text-white transform transition-all duration-700 ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        Section Assignment and Final Acceptance
      </h2>
    </div>
  );
};

export default ReviewHeader;
