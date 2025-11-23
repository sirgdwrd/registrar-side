import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw } from "lucide-react"; 
import ReviewSectionButtons from "./section/reviewSectionButtons"; 
import GradeCardList from "./section/GradeCardList"; 
import EditSectionModal from "./section/editSectionModal"; 
import RemoveGradeConfirmation from "./section/removeGradeConfirmation"; 

// --- HELPER FUNCTIONS ---

// Helper: Scroll functionality
const scroll = (ref, direction) => {
    if (ref.current) {
        const scrollAmount = 600; 
        const newScrollLeft = ref.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);

        ref.current.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth' 
        });
    }
};

// Helper: Notification style
const getNotificationStyle = (notification) => {
    if (!notification || !notification.type) {
        return { icon: null, class: 'hidden' };
    }
    
    switch(notification.type){
        case 'success':
            return { icon: <CheckCircle size={20} className="mr-2" />, class: 'bg-green-500 text-white' };
        case 'remove':
            return { icon: <XCircle size={20} className="mr-2" />, class: 'bg-rose-500 text-white' }; 
        case 'reset':
            return { icon: <RotateCcw size={20} className="mr-2" />, class: 'bg-indigo-500 text-white' }; 
        default:
            return { icon: null, class: 'hidden' };
    }
};

// Helper: Section Color
const getSectionColor = (current, max) => {
    const ratio = current / max;
    if (ratio >= 0.8) return "bg-red-500";
    if (ratio >= 0.5) return "bg-yellow-500";
    return "bg-green-500";
};

// **API CONFIGURATION**
const API_BASE_URL = 'http://localhost/registrar-gca-main/backend/api/sections/getSection.php'; 

// HELPER: Function for transform flat API data to frontend-friendly format
const transformApiData = (apiData) => {
    const gradesMap = {};

    if (!Array.isArray(apiData)) {
        console.error("API data is not an array:", apiData);
        return [];
    }
    
    apiData.forEach(item => {
        const gradeName = item.GradeLevelName;
        const section = {
            SectionID: item.SectionID, 
            GradeLevelID: item.GradeLevelID, 
            SchoolYearID: item.SchoolYearID,
            time: item.SectionName, 
            current: item.CurrentEnrollment,
            max: item.MaxCapacity,
            isDefault: item.IsDefault === 1, 
        };

        if (!gradesMap[gradeName]) {
            gradesMap[gradeName] = {
                GradeLevelID: item.GradeLevelID, 
                grade: gradeName,
                sections: [],
                isInitial: false, 
            };
        }
        gradesMap[gradeName].sections.push(section);
    });

    Object.values(gradesMap).forEach(gradeObj => {
        gradeObj.isInitial = gradeObj.sections.every(s => s.isDefault === true);
    });

    return Object.values(gradesMap);
};


// --- REVIEW SECTION COMPONENT ---
const ReviewSection = ({ sectionUpdateTrigger }) => {

    // OLD STATE
    const [show, setShow] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [gradeToRemove, setGradeToRemove] = useState(null); 
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const scrollRef = useRef(null); 

    // 💡 NEW CRITICAL STATES for Scroll Fix
    const [lastEditedSectionId, setLastEditedSectionId] = useState(null); 
    const [savedScrollPosition, setSavedScrollPosition] = useState(0); 

    // DATA & MODAL STATES
    const [sectionsData, setSectionsData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); 
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null); 
    const [editName, setEditName] = useState("");
    const [editMax, setEditMax] = useState(15);

    const [newGradeName, setNewGradeName] = useState(""); 
    const [newGradeLevelID, setNewGradeLevelID] = useState(null); 
        
    const [morningSection, setMorningSection] = useState("Morning Section");
    const [morningCapacity, setMorningCapacity] = useState(15);
    const [afternoonSection, setAfternoonSection] = useState("Afternoon Section");
    const [afternoonCapacity, setAfternoonCapacity] = useState(15);
    
    const [loading, setLoading] = useState(false);
    const [gradeError, setGradeError] = useState(null); 
    const [lastAddedGrade, setLastAddedGrade] = useState(null);
    const [notification, setNotification] = useState(null); 
    
    // Notification Timer Effect
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // **API INTEGRATION: Fetch Data**
    const fetchSections = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL, { method: 'GET' });
            
            if (response.headers.get("content-type") && !response.headers.get("content-type").includes("application/json")) {
                const errorText = await response.text();
                console.error("API returned non-JSON response. Check PHP error logs:", errorText);
                throw new Error("Invalid server response format.");
            }
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const transformedData = transformApiData(data);
            setSectionsData(transformedData);
        } catch (error) {
            console.error("Failed to fetch sections:", error);
            setNotification({ message: 'Error fetching data from server.', type: 'remove' });
        } finally {
            setLoading(false);
        }
    };

    // Initial Load Effect
    useEffect(() => {
        fetchSections(); 
        setTimeout(() => setShow(true), 50);
    }, []);

    // 🔄 AUTO REFRESH WHEN TRIGGERED BY REVIEWTABLE
    useEffect(() => {
        if (sectionUpdateTrigger !== null) {
            fetchSections();
        }
    }, [sectionUpdateTrigger]);
    
    // 💡 EFFECT 1: Highlight Logic 
   useEffect(() => {
    if (lastEditedSectionId > 0 && !loading && scrollRef.current) { 
        
        const targetElement = document.querySelector(`[data-section-id="${lastEditedSectionId}"]`);
        
        if (targetElement) {
            targetElement.classList.add('transition-all', 'duration-300', 'ring-2', 'ring-sky-400', 'scale-[1.015]'); 
            
            const highlightTimer = setTimeout(() => {
                targetElement.classList.remove('ring-2', 'ring-sky-400', 'scale-[1.015]'); 
                targetElement.classList.add('scale-100'); 
                
                setLastEditedSectionId(null); 
            }, 1500);

            return () => clearTimeout(highlightTimer);
        }
    }
}, [lastEditedSectionId, loading]);


    // 💡 EFFECT 2: RESTORE SCROLL POSITION 
    useEffect(() => {
    if (!loading && savedScrollPosition !== 0 && scrollRef.current) {
        scrollRef.current.scrollLeft = savedScrollPosition;
        setSavedScrollPosition(0); 
    }
}, [loading, savedScrollPosition]);

// 💡 EFFECT 3: Highlight Timer for NEWLY ADDED GRADE
useEffect(() => {
    if (lastAddedGrade) {
        const timer = setTimeout(() => {
            setLastAddedGrade(null); 
        }, 1500); 

        return () => clearTimeout(timer);
    }
}, [lastAddedGrade]); 
    const openEditModal = (sectionItem) => {
        setSelectedSection(sectionItem); 
        setEditName(sectionItem.time);
        setEditMax(sectionItem.max);
        setModalOpen(true);
    };

    // **UPDATE API Call (PUT) - With Scroll Save**
    const saveSection = async () => {
        if (!editName || !editMax) {
            alert("Please fill all fields.");
            return;
        }

        const sectionToUpdateId = selectedSection.SectionID; 
        const apiURL = `${API_BASE_URL}/${sectionToUpdateId}`; 
        if (scrollRef.current) {
            setSavedScrollPosition(scrollRef.current.scrollLeft);
        }

        setLoading(true); 

        try {
            const response = await fetch(apiURL, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    SectionName: editName,
                    MaxCapacity: Number(editMax)
                }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP Error response body:", errorText);
                throw new Error(`Server returned status ${response.status}. Check console.`);
            }

            const data = await response.json();
            
            if (data.message === "Section updated successfully.") { 
                setLastEditedSectionId(sectionToUpdateId); 

                await fetchSections(); 
                setModalOpen(false);
                setNotification({ message: 'Section updated successfully!', type: 'success' });
            } else {
                alert("Update failed: " + data.message);
                console.log("Update failed: ", data.message);
            }
        } catch (error) {
            alert("Update failed due to network or server error. Check console for details.");
            console.error("Fetch error:", error.message); 
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setGradeError(null); 
        setNewGradeName(""); 
        setNewGradeLevelID(null); 
        
        setMorningSection("Morning Section");
        setMorningCapacity(15);
        setAfternoonSection("Afternoon Section");
        setAfternoonCapacity(15);
        setAddModalOpen(true);
        setNotification(null);
    };

    // **CREATE API Call (POST)**
    const saveNewGradeSection = async () => {
    const gradeName = newGradeName.trim();
    
    if (!gradeName) { 
        setGradeError("Please enter a name for the new Grade Level."); 
        return; 
    }

    setLoading(true);

    const sectionsToAdd = [
        { SectionName: morningSection, MaxCapacity: Number(morningCapacity) },
        { SectionName: afternoonSection, MaxCapacity: Number(afternoonCapacity) }
    ];

    let successCount = 0;
    let hasError = false;
    let gradeAdded = false;
    let result = null; 
    
    const dataToSend = {
        GradeLevelName: gradeName, 
        SchoolYearID: 2025, 
        Sections: sectionsToAdd, 
    };
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
        });
        
        result = await response.json();
        if (response.status === 201) {
            gradeAdded = true;
            successCount = 2; 
        } else {
            console.error(`Failed to add new grade level (Status ${response.status}):`, result.message);
            hasError = true;
        }
    } catch (error) {
        console.error("API POST Error (Network/Server connection):", error);
        hasError = true;
    }


    if (gradeAdded) {
        await fetchSections();
        setLastAddedGrade(gradeName);
        setNotification({ message: `New Grade Level "${gradeName}" with ${successCount} sections added!`, type: 'success' });
        setNewGradeName(""); 
        setMorningSection("Morning Section");
        setMorningCapacity(15);
        setAfternoonSection("Afternoon Section");
        setAfternoonCapacity(15);
        setAddModalOpen(false); 
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollWidth,
                    behavior: 'smooth' 
                });
            }
        }, 300); 

    } else if (hasError) {
        const serverMessage = result && result.message ? result.message : 'Error adding new grade level. Check server logs.';
        setNotification({ message: serverMessage, type: 'remove' });
    }
    setLoading(false);
};

    // **DELETE API Call**
    const removeGrade = async (gradeData) => {
        const removableSections = gradeData.sections.filter(s => s.isDefault === false);
        setConfirmationOpen(false);
        setLoading(true);

        let successCount = 0;
        let hasError = false;

        for (const section of removableSections) {
            try {
                const response = await fetch(`${API_BASE_URL}/${section.SectionID}`, {
                    method: 'DELETE',
                });
                
                const result = await response.json();

                if (response.status === 200) { 
                    successCount++;
                } else {
                    console.error(`Failed to delete section ${section.SectionID}:`, result.message);
                    hasError = true;
                }
            } catch (error) {
                console.error("API DELETE Error:", error);
                hasError = true;
            }
        }

        if (successCount > 0) {
            await fetchSections();
            setNotification({ message: `${gradeData.grade} custom sections successfully removed.`, type: 'remove' });
        } else if (hasError || removableSections.length > 0) {
            setNotification({ message: 'Failed to remove custom sections. They might be fixed or have current enrollments.', type: 'remove' });
        } else {
            setNotification({ message: 'No removable custom sections found in this grade.', type: 'remove' });
        }
        
        setGradeToRemove(null);
        setLoading(false);
    };


    const openConfirmation = (gradeData) => {
        const hasRemovableSections = gradeData.sections.some(s => s.isDefault === false);
        
        if (hasRemovableSections) {
            setGradeToRemove(gradeData);
            setConfirmationOpen(true);
        } else {
            setNotification({ message: `Cannot remove fixed grade level: ${gradeData.grade}.`, type: 'remove' });
        }
    };
    
    // **PATCH API Call (Reset Enrollment)**
    const resetSections = async () => {
        setLoading(true);
        setResetModalOpen(false);
        
        try {
            const response = await fetch(`${API_BASE_URL}/reset-enrollment`, { 
                method: 'PATCH',
            });
            
            const result = await response.json();

            if (!response.ok) {
                 const errorMessage = result.message || 'Failed to reset enrollment.';
                 throw new Error(errorMessage);
            }
            
            await fetchSections(); 
            setNotification({ message: `All enrollments reset to 0!`, type: 'reset' });

        } catch (error) {
            console.error("Reset failed:", error);
            setNotification({ message: error.message || 'Error resetting enrollment.', type: 'remove' });
        } finally {
            setLoading(false);
        }
    };
    
    const finalNotifStyle = getNotificationStyle(notification);

    const gradeLevelOptions = sectionsData.map(g => ({ 
        id: g.GradeLevelID, 
        name: g.grade 
    }));


    return (
        <div
            className={`sticky top-0 bg-yellow-500 rounded-xl mb-4 p-4 transform transition-all duration-500 ease-out ${
                show ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } z-40 shadow-xl`}
        >
            {/* 1. NOTIFICATION */}
            {notification && (
                <div className="absolute inset-x-0 top-0 mx-auto w-max z-50 transform -translate-y-full transition-transform duration-500 ease-out">
                    <div className={`flex items-center text-sm font-bold px-4 py-2 rounded-lg shadow-xl ${finalNotifStyle.class}`}>
                        {finalNotifStyle.icon}
                        {notification.message}
                    </div>
                </div>
            )}

            {/* 2. HEADER and BUTTONS */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-gray-800 flex-grow font-serif"> 
                    {loading ? 'Loading sections...' : 'Click on a section card to edit.'}
                </h2>
                
                <ReviewSectionButtons 
                    openAddModal={openAddModal}
                    setResetModalOpen={setResetModalOpen}
                    resetModalOpen={resetModalOpen}
                    resetSections={resetSections}
                    addModalOpen={addModalOpen}
                    setAddModalOpen={setAddModalOpen}
                    
                    // CRITICAL PROPS FOR ADD SECTION MODAL
                    gradeLevelOptions={gradeLevelOptions} 
                    newGradeName={newGradeName}
                    setNewGradeName={(name) => {
                        setNewGradeName(name);
                        const selectedGrade = gradeLevelOptions.find(opt => opt.name === name);
                        setNewGradeLevelID(selectedGrade ? selectedGrade.id : null);
                    }}
                    morningSection={morningSection}
                    setMorningSection={setMorningSection}
                    morningCapacity={morningCapacity}
                    setMorningCapacity={setMorningCapacity}
                    afternoonSection={afternoonSection}
                    setAfternoonSection={setAfternoonSection}
                    afternoonCapacity={afternoonCapacity}
                    setAfternoonCapacity={setAfternoonCapacity}
                    gradeError={gradeError}
                    setGradeError={setGradeError}
                    saveNewGradeSection={saveNewGradeSection}
                />
            </div>
            
            {/* 3. SCROLLING GRADE CARDS LIST */}
            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll(scrollRef, "left")} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-white/80 border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                    <ChevronLeft size={20} className="text-gray-600" />
                </button>

                <button
                    onClick={() => scroll(scrollRef, "right")} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/80 border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                    <ChevronRight size={20} className="text-gray-600" />
                </button>

                <div className="overflow-x-auto scrollbar-hide relative z-0" ref={scrollRef}>
                    {loading ? (
                        <div className="text-center p-8 text-gray-600">Loading initial sections...</div>
                    ) : (
                        <GradeCardList
                            sectionsData={sectionsData}
                            lastAddedGrade={lastAddedGrade}
                            lastEditedSectionId={lastEditedSectionId} 
                            openConfirmation={(gradeName) => {
                                const gradeObj = sectionsData.find(g => g.grade === gradeName);
                                if (gradeObj) {
                                    openConfirmation(gradeObj); 
                                }
                            }}
                            openEditModal={(sectionItem) => openEditModal(sectionItem)}
                            getSectionColor={getSectionColor}
                        />
                    )}
                </div>
            </div>

            {/* 4. MODALS */}
            
            <EditSectionModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedTime={selectedSection ? selectedSection.time : ''}
                editName={editName}
                setEditName={setEditName}
                editMax={editMax}
                setEditMax={setEditMax}
                saveSection={saveSection}
            />

            <RemoveGradeConfirmation
                confirmationOpen={confirmationOpen}
                setConfirmationOpen={setConfirmationOpen}
                gradeToRemove={gradeToRemove ? gradeToRemove.grade : null} 
                removeGrade={() => removeGrade(gradeToRemove)} 
            />

        </div>
    );
};

export default ReviewSection;