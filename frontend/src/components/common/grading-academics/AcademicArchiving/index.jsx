import React, { useState, useMemo } from "react";
import SummaryCards from "./SummaryCards";
import Filters from "./Filters";
import ActionButtons from "./ActionButtons";
import ArchiveTable from "./ArchiveTable";
import ArchiveConfirmationModal from "./ArchiveConfirmationModal";
import ReviewRecordsModal from "./ReviewRecordsModal";
import BulkArchiveModal from "./BulkArchiveModal";
import ArchiveLogModal from "./ArchiveLogModal";
import SuccessToast from "../../../ui/SuccessToast";
import ViewArchiveModal from "./ViewArchiveModal";

const AcademicArchiving = () => {
  // State for filters
  const [filters, setFilters] = useState({
    schoolYear: "2023-2024",
    gradingPeriod: "Final",
    archiveStatus: "all",
  });

  // State for selected grade levels
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Modal states
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBulkArchiveModal, setShowBulkArchiveModal] = useState(false);
  const [showArchiveLogModal, setShowArchiveLogModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Selected grade for modals
  const [selectedGrade, setSelectedGrade] = useState(null);

  // NEW: Progress states
  const [archiveProgress, setArchiveProgress] = useState({
    isProcessing: false,
    currentStep: 0,
    totalSteps: 0,
    currentGrade: null,
    completedGrades: [],
    failedGrades: [],
  });

  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Mock data for grade level archiving status
  const gradeLevelsData = [
    {
      id: 1,
      gradeLevel: "Grade 1",
      totalStudents: 25,
      completeRecords: 25,
      missingItems: { subjects: 0, attendance: 0 },
      lastArchived: "Never",
      status: "ready",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
    {
      id: 2,
      gradeLevel: "Grade 2",
      totalStudents: 30,
      completeRecords: 18,
      missingItems: { subjects: 3, attendance: 2 },
      lastArchived: "Jun 15, 2023",
      status: "incomplete",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
    {
      id: 3,
      gradeLevel: "Grade 3",
      totalStudents: 28,
      completeRecords: 28,
      missingItems: { subjects: 0, attendance: 0 },
      lastArchived: "Never",
      status: "ready",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
    {
      id: 4,
      gradeLevel: "Grade 4",
      totalStudents: 32,
      completeRecords: 32,
      missingItems: { subjects: 0, attendance: 0 },
      lastArchived: "Jun 20, 2023",
      status: "archived",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
    {
      id: 5,
      gradeLevel: "Grade 5",
      totalStudents: 27,
      completeRecords: 22,
      missingItems: { subjects: 2, attendance: 1 },
      lastArchived: "Never",
      status: "incomplete",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
    {
      id: 6,
      gradeLevel: "Grade 6",
      totalStudents: 26,
      completeRecords: 26,
      missingItems: { subjects: 0, attendance: 0 },
      lastArchived: "Jun 18, 2023",
      status: "archived",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
    },
  ];

  // Filter grade levels based on filters
  const filteredGradeLevels = useMemo(() => {
    return gradeLevelsData.filter((grade) => {
      const matchesSchoolYear =
        filters.schoolYear === "" || grade.schoolYear === filters.schoolYear;
      const matchesGradingPeriod =
        filters.gradingPeriod === "" ||
        grade.gradingPeriod === filters.gradingPeriod;
      const matchesStatus =
        filters.archiveStatus === "all" ||
        grade.status === filters.archiveStatus;

      return matchesSchoolYear && matchesGradingPeriod && matchesStatus;
    });
  }, [filters]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const recordsToArchive = gradeLevelsData
      .filter((grade) => grade.status === "ready")
      .reduce((sum, grade) => sum + grade.completeRecords, 0);

    const incompleteRecords = gradeLevelsData
      .filter((grade) => grade.status === "incomplete")
      .reduce(
        (sum, grade) => sum + (grade.totalStudents - grade.completeRecords),
        0
      );

    const archiveReady = gradeLevelsData
      .filter((grade) => grade.status === "ready")
      .reduce((sum, grade) => sum + grade.completeRecords, 0);

    // Estimate storage (rough calculation)
    const estimatedStorage =
      ((recordsToArchive * 15) / 1024).toFixed(1) + " MB"; // ~15KB per student record

    return {
      recordsToArchive,
      incompleteRecords,
      archiveReady,
      estimatedStorage,
    };
  }, []);

  // Action handlers
  const handleArchive = (grade) => {
    setSelectedGrade(grade);
    setShowArchiveModal(true);
  };

  const handleReview = (grade) => {
    setSelectedGrade(grade);
    setShowReviewModal(true);
  };

  const handleView = (grade) => {
    setSelectedGrade(grade);
    setShowViewModal(true);
  };

  // UPDATED: Single archive with progress simulation
  const handleConfirmArchive = async () => {
    setArchiveProgress({
      isProcessing: true,
      currentStep: 0,
      totalSteps: 3, // Validation, Processing, Finalizing
      currentGrade: selectedGrade.gradeLevel,
      completedGrades: [],
      failedGrades: [],
    });

    // Simulate archive process with progress updates
    try {
      // Step 1: Validation
      setArchiveProgress((prev) => ({ ...prev, currentStep: 1 }));
      await simulateProcess(1000);

      // Step 2: Processing records
      setArchiveProgress((prev) => ({ ...prev, currentStep: 2 }));
      await simulateProcess(2000);

      // Step 3: Finalizing
      setArchiveProgress((prev) => ({ ...prev, currentStep: 3 }));
      await simulateProcess(1000);

      // Success
      setShowArchiveModal(false);
      setArchiveProgress({
        isProcessing: false,
        currentStep: 0,
        totalSteps: 0,
        currentGrade: null,
        completedGrades: [selectedGrade.id],
        failedGrades: [],
      });

      showToastMessage(
        `${selectedGrade.gradeLevel} records archived successfully! (${selectedGrade.completeRecords} student records)`,
        "success"
      );
    } catch (error) {
      setArchiveProgress((prev) => ({
        ...prev,
        isProcessing: false,
        failedGrades: [selectedGrade.id],
      }));
      showToastMessage(
        `Failed to archive ${selectedGrade.gradeLevel}. Please try again.`,
        "error"
      );
    }
  };

  // UPDATED: Bulk archive with progress simulation
  const handleConfirmBulkArchive = async () => {
    const selectedReadyGrades = filteredGradeLevels.filter(
      (grade) => grade.status === "ready" && selectedGrades.includes(grade.id)
    );

    setArchiveProgress({
      isProcessing: true,
      currentStep: 0,
      totalSteps: selectedReadyGrades.length,
      currentGrade: null,
      completedGrades: [],
      failedGrades: [],
    });

    // Simulate bulk archive process
    try {
      for (let i = 0; i < selectedReadyGrades.length; i++) {
        const grade = selectedReadyGrades[i];

        setArchiveProgress((prev) => ({
          ...prev,
          currentStep: i + 1,
          currentGrade: grade.gradeLevel,
        }));

        // Simulate processing each grade
        await simulateProcess(1500);

        setArchiveProgress((prev) => ({
          ...prev,
          completedGrades: [...prev.completedGrades, grade.id],
        }));
      }

      // Success
      setShowBulkArchiveModal(false);
      setArchiveProgress({
        isProcessing: false,
        currentStep: 0,
        totalSteps: 0,
        currentGrade: null,
        completedGrades: selectedReadyGrades.map((g) => g.id),
        failedGrades: [],
      });

      showToastMessage(
        `Bulk archive completed! ${selectedReadyGrades.length} selected grade levels archived.`,
        "success"
      );

      // Clear selections after operation
      setSelectedGrades([]);
      setSelectAll(false);
    } catch (error) {
      setArchiveProgress((prev) => ({
        ...prev,
        isProcessing: false,
      }));
      showToastMessage(
        "Bulk archive partially completed. Some grades failed.",
        "warning"
      );
    }
  };

  // Helper function to simulate processing time
  const simulateProcess = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleBulkArchive = () => {
    const selectedReadyGrades = filteredGradeLevels.filter(
      (grade) => grade.status === "ready" && selectedGrades.includes(grade.id)
    );

    if (selectedReadyGrades.length === 0) {
      showToastMessage(
        "Please select at least one 'Ready' grade level to archive.",
        "warning"
      );
      return;
    }

    setSelectedGrade(null);
    setShowBulkArchiveModal(true);
  };

  const handleViewArchiveLog = () => {
    setShowArchiveLogModal(true);
  };

  const showToastMessage = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast({
      isVisible: false,
      message: "",
      type: "success",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Academic Record Archiving
      </h1>

      <SummaryCards stats={summaryStats} />

      <Filters filters={filters} onFilterChange={setFilters} />

      <ActionButtons
        selectedCount={selectedGrades.length}
        onViewArchiveLog={handleViewArchiveLog}
        onBulkArchive={handleBulkArchive}
        isProcessing={archiveProgress.isProcessing} // NEW: Pass processing state
      />

      <ArchiveTable
        gradeLevels={filteredGradeLevels}
        selectedGrades={selectedGrades}
        selectAll={selectAll}
        onSelectGrade={(gradeId) => {
          setSelectedGrades((prev) =>
            prev.includes(gradeId)
              ? prev.filter((id) => id !== gradeId)
              : [...prev, gradeId]
          );
        }}
        onSelectAll={(selected) => {
          setSelectAll(selected);
          setSelectedGrades(
            selected ? filteredGradeLevels.map((grade) => grade.id) : []
          );
        }}
        onArchive={handleArchive}
        onReview={handleReview}
        onView={handleView}
        isProcessing={archiveProgress.isProcessing} // NEW: Pass processing state
      />

      {/* Modals */}
      <ArchiveConfirmationModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={handleConfirmArchive}
        gradeLevel={selectedGrade}
        progress={archiveProgress} // NEW: Pass progress state
      />

      <ReviewRecordsModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        gradeLevel={selectedGrade}
      />

      <BulkArchiveModal
        isOpen={showBulkArchiveModal}
        onClose={() => setShowBulkArchiveModal(false)}
        onConfirm={handleConfirmBulkArchive}
        readyGrades={filteredGradeLevels.filter(
          (grade) => grade.status === "ready"
        )}
        selectedReadyGrades={filteredGradeLevels.filter(
          (grade) =>
            grade.status === "ready" && selectedGrades.includes(grade.id)
        )}
        progress={archiveProgress} // NEW: Pass progress state
      />

      <ArchiveLogModal
        isOpen={showArchiveLogModal}
        onClose={() => setShowArchiveLogModal(false)}
      />

      <SuccessToast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <ViewArchiveModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        gradeLevel={selectedGrade}
      />
    </div>
  );
};

export default AcademicArchiving;
