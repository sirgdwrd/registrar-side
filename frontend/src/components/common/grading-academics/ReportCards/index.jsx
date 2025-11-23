import React, { useState, useMemo } from "react";
import SummaryCards from "./SummaryCards";
import Filters from "./Filters";
import ActionButtons from "./ActionButtons";
import ReportCardsTable from "./ReportCardsTable";
import ReleaseConfirmationModal from "./ReleaseConfirmationModal";
import BulkReleaseConfirmationModal from "./BulkReleaseConfirmationModal";
import SuccessToast from "../../../ui/SuccessToast";
import { fullMockReportCards } from "./mockData";

const ReportCards = () => {
  const [filters, setFilters] = useState({
    gradingPeriod: "",
    gradeLevel: "",
    status: "",
  });

  const [selectedReportCards, setSelectedReportCards] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Add state for bulk release confirmation modal
  const [showBulkReleaseModal, setShowBulkReleaseModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reportCardsPerPage = 50;

  // Filter report cards based on filters
  const filteredReportCards = useMemo(() => {
    return fullMockReportCards.filter((reportCard) => {
      const matchesGradingPeriod =
        filters.gradingPeriod === "" ||
        reportCard.gradingPeriod === filters.gradingPeriod;
      const matchesGradeLevel =
        filters.gradeLevel === "" ||
        reportCard.gradeLevel === filters.gradeLevel;
      const matchesStatus =
        filters.status === "" || reportCard.status === filters.status;

      return matchesGradingPeriod && matchesGradeLevel && matchesStatus;
    });
  }, [filters]);

  // Filter out released report cards from selectable ones
  const selectableReportCards = useMemo(() => {
    return filteredReportCards.filter(
      (reportCard) => reportCard.status !== "Released"
    );
  }, [filteredReportCards]);

  // Calculate paginated report cards
  const paginatedReportCards = useMemo(() => {
    const startIndex = (currentPage - 1) * reportCardsPerPage;
    const endIndex = startIndex + reportCardsPerPage;
    return filteredReportCards.slice(startIndex, endIndex);
  }, [filteredReportCards, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedReportCards([]);
    setSelectAll(false);
  }, [filters]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const readyCount = fullMockReportCards.filter(
      (rc) => rc.status === "Ready"
    ).length;
    const pendingCount = fullMockReportCards.filter(
      (rc) => rc.status === "Pending"
    ).length;
    const releasedCount = fullMockReportCards.filter(
      (rc) => rc.status === "Released"
    ).length;
    const totalCount = fullMockReportCards.length;

    return {
      readyToRelease: readyCount,
      pendingApproval: pendingCount,
      releasedReportCards: releasedCount,
      totalThisQuarter: totalCount,
    };
  }, []);

  const handleSelectReportCard = (reportCardId) => {
    // Only allow selection if report card is not released
    const reportCard = filteredReportCards.find((rc) => rc.id === reportCardId);
    if (reportCard && reportCard.status === "Released") {
      return;
    }

    setSelectedReportCards((prev) =>
      prev.includes(reportCardId)
        ? prev.filter((id) => id !== reportCardId)
        : [...prev, reportCardId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedReportCards([]);
    } else {
      // Only select non-released report cards
      setSelectedReportCards(
        selectableReportCards.map((reportCard) => reportCard.id)
      );
    }
    setSelectAll(!selectAll);
  };

  const clearFilters = () => {
    setFilters({ gradingPeriod: "", gradeLevel: "", status: "" });
    setSelectedReportCards([]);
    setSelectAll(false);
    setCurrentPage(1);
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleBulkPrint = () => {
    // In real app, this would generate and download a combined PDF
    showToastMessage(
      `Generated single PDF with ${selectedReportCards.length} report cards successfully!`,
      "success"
    );
    setSelectedReportCards([]);
    setSelectAll(false);
  };

  // NEW: Handle bulk release confirmation
  const handleBulkReleaseConfirmation = (selectedCount) => {
    setShowBulkReleaseModal(true);
  };

  // NEW: Execute confirmed bulk release
  const handleConfirmBulkRelease = () => {
    setShowBulkReleaseModal(false);

    // In real app, this would update status to "Released" and send notifications
    showToastMessage(
      `Released ${selectedReportCards.length} report cards to parents via email and portal!`,
      "success"
    );
    setSelectedReportCards([]);
    setSelectAll(false);
  };

  const handleBulkRelease = () => {
    // This function is now only called from the confirmation modal
    // Keeping it for backward compatibility
    handleConfirmBulkRelease();
  };

  const totalPages = Math.ceil(filteredReportCards.length / reportCardsPerPage);

  const handleModalAction = (action, reportCard) => {
    if (action === "release") {
      showToastMessage(
        `Report card for ${reportCard.studentName} released to parents successfully!`,
        "success"
      );
    } else if (action === "print") {
      showToastMessage(
        `Report card for ${reportCard.studentName} printed successfully!`,
        "info"
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Report Card Generation & Release
      </h1>

      <SummaryCards stats={summaryStats} />

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      <ActionButtons
        selectedCount={selectedReportCards.length}
        onBulkPrint={handleBulkPrint}
        onBulkRelease={handleBulkRelease}
        onBulkReleaseConfirmation={handleBulkReleaseConfirmation}
      />

      <ReportCardsTable
        reportCards={paginatedReportCards}
        selectedReportCards={selectedReportCards}
        selectAll={selectAll}
        onSelectReportCard={handleSelectReportCard}
        onSelectAll={handleSelectAll}
        currentPage={currentPage}
        totalPages={totalPages}
        totalReportCards={filteredReportCards.length}
        reportCardsPerPage={reportCardsPerPage}
        onPageChange={setCurrentPage}
        onModalAction={handleModalAction}
      />

      {/* Bulk Release Confirmation Modal */}
      <BulkReleaseConfirmationModal
        isOpen={showBulkReleaseModal}
        onClose={() => setShowBulkReleaseModal(false)}
        onConfirm={handleConfirmBulkRelease}
        selectedCount={selectedReportCards.length}
      />

      <SuccessToast
        isVisible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ReportCards;
