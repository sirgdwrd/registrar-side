import React from "react";

const RequestInfo = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]">
      <div className="bg-white dark:bg-slate-800 rounded-xl w-[600px] p-6 shadow-lg relative text-black dark:text-white">
        <button
          className="text-sm text-gray-600 dark:text-gray-300 mb-3 hover:text-gray-800 dark:hover:text-gray-100"
          onClick={onClose}
        >
          &larr; Back
        </button>

        <div className="space-y-5">
          {/* From Field */}
          <div>
            <label className="font-semibold block mb-1">From</label>
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
              <img
                src="https://via.placeholder.com/32"
                alt="Registrar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>Registrar (Me)</span>
            </div>
          </div>

          {/* To Field */}
          <div>
            <label className="font-semibold block mb-1">To</label>
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
              <img
                src="https://via.placeholder.com/32"
                alt="Recipient"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>Abad, Kristine M.</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-300 dark:bg-gray-600 my-2"></div>

          {/* Subject / Message Field */}
          <div>
            <label className="font-semibold block mb-1">Subject</label>
            <textarea
              placeholder="Enter your message here..."
              className="w-full h-36 p-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none resize-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-700 text-black dark:text-white"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-3">
            <button
              className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
