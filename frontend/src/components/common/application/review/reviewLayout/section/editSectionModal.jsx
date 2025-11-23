import React from 'react';

const EditSectionModal = ({
    modalOpen,
    setModalOpen,
    selectedTime,
    editName,
    setEditName,
    editMax,
    setEditMax,
    saveSection,
}) => {
    if (!modalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 transform scale-100">
            <div className="bg-white p-6 rounded-xl w-[300px] flex flex-col gap-3 shadow-xl transform transition-all duration-300 scale-100">
                <h3 className="font-bold text-lg text-gray-900">
                    Edit {selectedTime} Section
                </h3>

                <input
                    placeholder="Section Name"
                    className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Capacity"
                    className="p-2 rounded border border-gray-300 w-full text-gray-900 bg-white"
                    value={editMax}
                    onChange={(e) => setEditMax(e.target.value)}
                />

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600 shadow-sm text-white font-semibold"
                        onClick={saveSection}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSectionModal;