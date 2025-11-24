import React, { useState, useEffect, useRef } from "react";
import SectionAssignmentModal from './table/sectionAssignmentModal';
import TablePagination from './table/tablePagination';
import SuccessToast from "../../../../ui/SuccessToast"; 
import BulkSectionModal from "./table/BulkSectionModal";

const BASE_API = "http://localhost/registrar-gca-main/backend/api/applicants";
const ReviewTable = ({ selectedFinalRows = [], toggleFinalRow = () => {}, statusUpdates = {}, triggerSectionUpdate = () => {} }) => {
                                                                       
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevDataRef = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [hoveredHeader, setHoveredHeader] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

    // 💡 TOAST STATE 💡
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'success', // or 'error' if you include ErrorToast
    });

    // 💡 PAGINATION STATES 💡
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    
    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicantToEdit, setApplicantToEdit] = useState(null); 
    // Section options for the dropdown
    const [sectionOptions, setSectionOptions] = useState([]);
    
    // Function to open the modal
    const handleAssignSectionClick = (applicant) => {
        setApplicantToEdit(applicant);
        setIsModalOpen(true);
    };
    
    useEffect(() => {
    if (applicantToEdit?.grade) {
        fetch(`http://localhost/registrar-gca-main/backend/api/sections/getByGrade.php?grade=${applicantToEdit.grade}`)
        .then((res) => res.json())
        .then((data) => setSectionOptions(data))
        .catch((err) => console.error(err));
    } else {
        setSectionOptions([]);
    }
    }, [applicantToEdit]);

    // Function to close the modal and reset state
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setApplicantToEdit(null);
    };

    // 📊 DATA FETCHING LOGIC 
    const fetchApplicants = async () => {
        try {
        // ... (API fetch logic) ...
        const response = await fetch(`${BASE_API}/getValidatedApplicants.php`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        if (result.success) {
            const newData = result.data.map(app => ({ ...app }));
            
            if (JSON.stringify(prevDataRef.current) !== JSON.stringify(newData)) {
            setApplicants(newData);
            prevDataRef.current = newData;
            }
            setError(null);
        } else {
            throw new Error(result.message || "Failed to fetch validated applicants");
        }
        } catch (err) {
        setError(err.message);
        setApplicants([]);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
        const interval = setInterval(fetchApplicants, 3000); 
        return () => clearInterval(interval);
    }, []); 

    useEffect(() => {
        setSelectedRows([]);
        setCurrentPage(1); 
    }, [applicants]);

    const isSelected = (id) => selectedRows.includes(id);
    const toggleRow = (id) => {
        setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
        toggleFinalRow(id);
    };
    
    const toggleSelectAll = (checked) =>
        setSelectedRows(checked ? currentApplicants.map((a) => a.id) : []);

    // --- 💡 PAGINATION LOGIC 💡 ---
    const totalPages = Math.ceil(applicants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentApplicants = applicants.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); 
    };

    // 🚀 API ACTION LOGIC, SINGLE SECTIONING
    const handleSectionSave = async (applicantId, sectionId) => {
        const assignedApplicant = applicants.find(a => a.id === applicantId); 
        handleCloseModal();
        setLoading(true);

        try {
            const response = await fetch(`${BASE_API}/assignSection.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ applicantId, sectionId }),
            });
            const result = await response.json();
            
            if (result.success && assignedApplicant) {
                setToast({
                    isVisible: true,
                    message: `${assignedApplicant.firstName} ${assignedApplicant.lastName} assigned successfully.`,
                    type: 'success',
                });
                await fetchApplicants();
                triggerSectionUpdate(); 
            }
            else throw new Error(result.message || "Server reported failure.");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 📢 BULK ACTION LOGIC 
   const handleAcceptAllQualified = () => {
    if (selectedRows.length === 0) {
        setToast({
            isVisible: true,
            message: "Please select at least one applicant.",
            type: "error"
        });
        return;
    }

    setIsBulkModalOpen(true); // open modal instead of window.confirm
};

const confirmBulkAssign = async () => {
    setIsBulkModalOpen(false); // close modal
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`${BASE_API}/bulkAssignSections.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ applicantIds: selectedRows }),
        });

        const result = await response.json();

       if (result.success) {
    await fetchApplicants();
    setSelectedRows([]);
    triggerSectionUpdate();

    const assigned = result.results.filter(r => r.status === "Assigned").length;
    const full = result.results.filter(r => r.status === "All sections full").length;
    const enrolled = result.results.filter(r => r.status === "Already enrolled").length;

    let toastMsg = `Successfully assigned ${assigned} student${assigned !== 1 ? 's' : ''}`;

    if (enrolled) toastMsg += `\n⚠️ Already enrolled: ${enrolled}`;
    if (full) toastMsg += `\n⚠️ All sections full: ${full}`;

    setToast({ isVisible: true, message: toastMsg, type: 'success' });

} else {
    throw new Error(result.message || "Bulk assignment failed.");
}

    } catch (error) {
        setToast({ isVisible: true, message: `❌ Bulk action failed: ${error.message}`, type: 'error' });
    } finally {
        setLoading(false);
    }
};

    // ✅ UI states
    
    // 💡 PAGINATION DISPLAY TEXT 💡
    const startDisplay = applicants.length > 0 ? startIndex + 1 : 0;
    const endDisplay = Math.min(endIndex, applicants.length);
    const displayCountText = 
        totalPages > 1 
            ? ( 
                <>
                Showing <span className="font-bold text-blue-600 dark:text-blue-400">
                    {startDisplay}-{endDisplay}
                </span> of <span className="font-bold text-blue-600 dark:text-blue-400">
                    {applicants.length}
                </span> Applicants
                </>
                )
                : ( 
                    <>
                    Total Applicants: <span className="font-bold text-blue-600 dark:text-blue-400">
                        {applicants.length}
                    </span>
                    </>
                );
            
    return (
        <>
        <SuccessToast
            isVisible={toast.isVisible}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, isVisible: false })}
        />

        {loading && <p className="text-center mt-5">Loading validated applicants...</p>}
        {error && <p className="text-center mt-5 text-red-500">Error: {error}</p>}
        {!loading && !error && !applicants.length && (
            <p className="text-center mt-5 text-black dark:text-white">No validated applicants yet.</p>
        )}

        <style>
            {`
            @keyframes slide-up { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
            .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
            @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}
        </style>

        {applicants.length > 0 && (
            <div className="mt-5 rounded-2xl shadow-md border border-gray-300 dark:border-slate-600 overflow-visible animate-slide-up">
                <div className="rounded-2xl overflow-x-auto">
                <table className="min-w-[800px] w-full border-collapse relative overflow-visible z-10">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700 text-left border-b border-gray-400 dark:border-slate-500">
                        <th colSpan="7" className="p-0">
                        <div className="flex items-center justify-between px-4 py-3">
                            
                            {/* 💡 BULK ACTION BUTTON (Left Side) */}
                            <button
                                onClick={handleAcceptAllQualified}
                                disabled={selectedRows.length === 0 || loading}
                                className={`
                                    px-4 py-2 text-sm font-semibold rounded-lg transition
                                    ${selectedRows.length > 0 && !loading
                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {loading 
                                    ? 'Processing...' 
                                    : `Accept & Auto-Assign Section (${selectedRows.length})`
                                }
                            </button>

                            {/* 💡 PAGINATION DISPLAY TEXT (Right Side) */}
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                {displayCountText}
                            </span>

                        </div>
                        </th>
                    </tr>

                        {/* SECOND HEADER ROW (Column Titles) */}
                    <tr className="bg-gray-100 dark:bg-slate-700 text-left border-t border-gray-400 dark:border-slate-500">
                        <th className="px-4 py-3 w-12 text-center relative overflow-visible">
                            <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={currentApplicants.length > 0 && currentApplicants.every(a => selectedRows.includes(a.id))}
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                                onMouseEnter={() => setHoveredHeader(true)}
                                onMouseLeave={() => setHoveredHeader(false)}
                                className="cursor-pointer"
                            />
                            {hoveredHeader && (
                                <span className="absolute left-full ml-2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                                    Select all
                                </span>
                            )}
                            </div>
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Applicant Name</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Payment Method</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Student Type</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">Grade Level</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white text-center">Status</th> 
                        <th className="px-4 py-3 text-sm font-semibold text-center text-gray-800 dark:text-white">Section Assignment</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* Pagination */}
                    {currentApplicants.map((a) => ( 
                        <tr
                            key={a.id}
                            className={`transition-colors duration-150 border-b border-gray-400 dark:border-slate-600
                            ${
                                isSelected(a.id)
                                    ? "bg-[#F8C471] dark:bg-[#C29134]"
                                    : "hover:bg-gray-50 dark:hover:bg-slate-700"
                            }`}
                        >
                            <td className="px-4 py-3 text-center relative overflow-visible">
                                <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={isSelected(a.id)}
                                    onChange={() => toggleRow(a.id)}
                                    onMouseEnter={() => setHoveredId(a.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="cursor-pointer"
                                />
                                {hoveredId === a.id && (
                                    <span className="absolute left-full ml-2 bg-black text-white text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap z-[9999]">
                                        Select
                                    </span>
                                )}
                                </div>
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-800 dark:text-white font-medium">
                                {a.lastName}, {a.firstName} {a.middleInitial || ""}
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {a.paymentMethod || "—"}
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {a.studentType || "—"}
                            </td>
                                
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {a.grade || "—"}
                            </td>

                            {/* STATUS */}
                            <td className="px-4 py-3 text-center">
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-600 text-white dark:bg-blue-500">
                                    {a.status || "—"}
                                </span>
                            </td>

                            {/* SECTION ASSIGNMENT */}
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 text-center">
                                {a.section ? (
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-blue-700 dark:text-blue-300">
                                            {a.section}
                                        </span>
                                        <button
                                            onClick={() => handleAssignSectionClick(a)}
                                            className="ml-auto text-xs px-2 py-0.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-600"
                                        >
                                            Change
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAssignSectionClick(a)}
                                        className="w-auto text-xs px-3 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow-md"
                                    >
                                        Assign Section
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        )}
        
        {/* 💡 PAGINATION CONTROLS 💡 */}
        <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
            handleItemsPerPageChange={handleItemsPerPageChange}
        />

        {/* Section Assignment Modal Integration */}
        <SectionAssignmentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            applicant={applicantToEdit}
            onSave={handleSectionSave}
            options={sectionOptions}
        />
        {/* Bulk Sectioning Modal */}
        <BulkSectionModal
    isOpen={isBulkModalOpen}
    onClose={() => setIsBulkModalOpen(false)}
    onConfirm={confirmBulkAssign}
    selectedCount={selectedRows.length}
/>

        </>
    );
};

export default ReviewTable;