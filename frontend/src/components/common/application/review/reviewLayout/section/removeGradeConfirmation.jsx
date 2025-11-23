import React from 'react';

const RemoveGradeConfirmation = ({
    confirmationOpen,
    setConfirmationOpen,
    gradeToRemove,
    removeGrade,
}) => {
    if (!confirmationOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-[300px] flex flex-col gap-3 shadow-xl transform transition-all duration-300 scale-100">
                <h3 className="font-bold text-lg text-gray-900">
                    Are you sure you want to remove {gradeToRemove}?
                </h3>

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setConfirmationOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                        onClick={() => removeGrade(gradeToRemove)}
                    >
                        Yes, Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveGradeConfirmation;