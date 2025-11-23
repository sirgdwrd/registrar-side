import React from "react";
import SectionFilters from "./SectionFilters";
import SectionGrid from "./SectionGrid";
import StudentRoster from "./StudentRoster";
import PrintRostersModal from "./PrintRostersModal";
import NotifyTeacherModal from "./NotifyTeacherModal";
import NotifyParentsModal from "./NotifyParentsModal";
import ConfirmationModal from "./ConfirmationModal";
import SuccessToast from "../../../ui/SuccessToast";
import { useClassRosters } from "./useClassRosters";

const ClassRosters = () => {
  const {
    filters,
    setFilters,
    selectedSection,
    setSelectedSection,
    filteredSections,
    filteredStudents,
    gradeLevels,
    sectionsList,
    teachers,
    showPrintModal,
    showNotifyTeacherModal,
    showNotifyParentsModal,
    setShowPrintModal,
    setShowNotifyTeacherModal,
    setShowNotifyParentsModal,
    handlePrintRosters,
    handleNotifyTeachers,
    handleNotifyParents,
    handleConfirmPrint,
    handleConfirmTeacherNotification,
    handleConfirmParentNotification,
    clearFilters,
    // New states and functions
    showConfirmationModal,
    setShowConfirmationModal,
    confirmationAction,
    confirmationData,
    toast,
    hideToast,
    handleConfirmation,
    executeConfirmedAction,
  } = useClassRosters();

  return (
    <div className="space-y-6">
      <SectionFilters
        filters={filters}
        setFilters={setFilters}
        gradeLevels={gradeLevels}
        sectionsList={sectionsList}
        teachers={teachers}
        clearFilters={clearFilters}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionGrid
          sections={filteredSections}
          selectedSection={selectedSection}
          onSectionSelect={setSelectedSection}
        />

        <StudentRoster
          selectedSection={selectedSection}
          students={filteredStudents}
          onPrintRosters={handlePrintRosters}
          onNotifyTeachers={handleNotifyTeachers}
          onNotifyParents={handleNotifyParents}
        />
      </div>

      {/* Modals - Make sure onConfirmation is passed correctly */}
      <PrintRostersModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        selectedSection={selectedSection}
        onConfirm={handleConfirmPrint}
        onConfirmation={handleConfirmation}
      />

      <NotifyTeacherModal
        isOpen={showNotifyTeacherModal}
        onClose={() => setShowNotifyTeacherModal(false)}
        selectedSection={selectedSection}
        onConfirm={handleConfirmTeacherNotification}
        onConfirmation={handleConfirmation}
      />

      <NotifyParentsModal
        isOpen={showNotifyParentsModal}
        onClose={() => setShowNotifyParentsModal(false)}
        selectedSection={selectedSection}
        students={filteredStudents}
        onConfirm={handleConfirmParentNotification}
        onConfirmation={handleConfirmation}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={executeConfirmedAction}
        actionType={confirmationAction}
        selectedSection={selectedSection}
        data={confirmationData}
      />

      {/* Toast Notification */}
      <SuccessToast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default ClassRosters;
