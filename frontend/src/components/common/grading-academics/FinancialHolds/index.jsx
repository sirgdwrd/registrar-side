import React, { useState, useMemo } from 'react';
import SummaryCards from './SummaryCards';
import Filters from './Filters';
import ActionButtons from './ActionButtons';
import StudentsTable from './StudentsTable';
import FinancialHoldModal from './FinancialHoldModal';
import SuccessToast from '../../../ui/SuccessToast';
import { mockFinancialHolds } from './mockData';

const FinancialHolds = () => {
  const [filters, setFilters] = useState({
    examPeriod: '',
    gradeLevel: ''
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 50;

  // Modal and Toast states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');


  // Filter students based on filters
  const filteredStudents = useMemo(() => {
    return mockFinancialHolds.filter(student => {
      const matchesExamPeriod = filters.examPeriod === '' || student.examPeriod === filters.examPeriod;
      const matchesGradeLevel = filters.gradeLevel === '' || student.gradeLevel === filters.gradeLevel;
      
      return matchesExamPeriod && matchesGradeLevel;
    });
  }, [filters]);

  // Calculate paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    return {
      activeHolds: mockFinancialHolds.filter(s => s.holdStatus === 'Active').length,
      midtermHolds: mockFinancialHolds.filter(s => s.examPeriod === 'Midterm' && s.holdStatus === 'Active').length,
      finalExamHolds: mockFinancialHolds.filter(s => s.examPeriod === 'Final' && s.holdStatus === 'Active').length,
      clearedThisWeek: mockFinancialHolds.filter(s => s.holdStatus === 'Cleared').length
    };
  }, []);

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
    setSelectAll(!selectAll);
  };

  const clearFilters = () => {
    setFilters({ examPeriod: '', gradeLevel: '' });
    setSelectedStudents([]);
    setSelectAll(false);
    setCurrentPage(1);
  };

  const handleExport = () => {
    alert(`Exporting ${filteredStudents.length} financial holds to Excel`);
  };

  const handleUpdateHolds = () => {
    alert(`Updating holds for ${selectedStudents.length} selected students`);
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseProfile = () => {
    setSelectedStudent(null);
  };

  // Handle actions from the modal
  const handleModalAction = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setSelectedStudent(null); // Close the modal
  };

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Financial Hold Management
      </h1>

      <SummaryCards stats={summaryStats} />
      
      <Filters 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      <ActionButtons 
        selectedCount={selectedStudents.length}
        onExport={handleExport}
        onUpdateHolds={handleUpdateHolds}
      />

      <StudentsTable 
        students={paginatedStudents}
        selectedStudents={selectedStudents}
        selectAll={selectAll}
        onSelectStudent={handleSelectStudent}
        onSelectAll={handleSelectAll}
        currentPage={currentPage}
        totalPages={totalPages}
        totalStudents={filteredStudents.length}
        studentsPerPage={studentsPerPage}
        onPageChange={setCurrentPage}
        onViewProfile={handleViewProfile}
      />

      <FinancialHoldModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={handleCloseProfile}
        onActionComplete={handleModalAction} // Make sure this line exists and is correct
      />

      <SuccessToast
        isVisible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => {
          setShowToast(false);
        }}
      />
    </div>
  );
};

export default FinancialHolds;