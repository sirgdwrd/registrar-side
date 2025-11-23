import React, { useState, useMemo } from "react";
import Filters from "./Filters";
import ArchiveBrowser from "./ArchiveBrowser";
import ViewArchiveModal from "./ViewArchiveModal";
import SuccessToast from "../../../../ui/SuccessToast";

const ArchiveViewer = () => {
  // State for filters
  const [filters, setFilters] = useState({
    schoolYear: "2023-2024",
    gradeLevel: "",
    archiveDate: ""
  });

  // Modal state
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState(null);

  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success"
  });

  // Mock archived records data
  const archivedRecords = [
    {
      id: 1,
      gradeLevel: "Grade 4",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      archiveDate: "2024-06-20",
      totalStudents: 32,
      fileSize: "1.4 MB",
      archivedBy: "Admin User"
    },
    {
      id: 2,
      gradeLevel: "Grade 6", 
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      archiveDate: "2024-06-18",
      totalStudents: 26,
      fileSize: "1.1 MB",
      archivedBy: "Admin User"
    },
    {
      id: 3,
      gradeLevel: "Grade 2",
      schoolYear: "2023-2024",
      gradingPeriod: "Final",
      archiveDate: "2024-06-15", 
      totalStudents: 30,
      fileSize: "1.3 MB",
      archivedBy: "Admin User"
    },
    {
      id: 4,
      gradeLevel: "All Grades",
      schoolYear: "2022-2023",
      gradingPeriod: "Final",
      archiveDate: "2023-06-25",
      totalStudents: 168,
      fileSize: "7.2 MB",
      archivedBy: "System Admin"
    }
  ];

  // Filter archived records
  const filteredArchives = useMemo(() => {
    return archivedRecords.filter(archive => {
      const matchesSchoolYear = 
        filters.schoolYear === "" || archive.schoolYear === filters.schoolYear;
      const matchesGradeLevel = 
        filters.gradeLevel === "" || archive.gradeLevel === filters.gradeLevel;
      const matchesArchiveDate = 
        filters.archiveDate === "" || archive.archiveDate === filters.archiveDate;

      return matchesSchoolYear && matchesGradeLevel && matchesArchiveDate;
    });
  }, [filters]);

  const handleViewArchive = (archive) => {
    setSelectedArchive(archive);
    setShowViewModal(true);
  };

  const handleDownload = (archive) => {
    // BACKEND: Download archive file
    console.log("BACKEND: Downloading archive", archive.id);
    showToastMessage(
      `Downloading ${archive.gradeLevel} archive...`,
      "info"
    );
  };

  const showToastMessage = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast({
      isVisible: false,
      message: "",
      type: "success"
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Archive Viewer
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Browse and access archived academic records from previous school years and grading periods.
      </p>

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        archivedRecords={archivedRecords}
      />

      <ArchiveBrowser
        archives={filteredArchives}
        onViewArchive={handleViewArchive}
        onDownload={handleDownload}
      />

      <ViewArchiveModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        archive={selectedArchive}
      />

      <SuccessToast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default ArchiveViewer;