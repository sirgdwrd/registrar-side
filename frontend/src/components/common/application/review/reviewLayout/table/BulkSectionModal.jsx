import React from "react";

const BulkSectionModal = ({ isOpen, onClose, onConfirm, selectedCount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-96 p-6 animate-fade-in-up">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Confirm Bulk Assignment
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to accept and assign sections to <span className="font-semibold">{selectedCount}</span> selected applicant(s)?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkSectionModal;
