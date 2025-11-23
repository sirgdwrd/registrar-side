import React, { useState, useMemo } from 'react';
import SearchFilters from './SearchFilters';
import ActionBar from './ActionBar';
import StudentsTable from './StudentsTable/index';
import StudentProfileModal from './StudentProfileModal';
import { useStudentFilters } from './useStudentFilters';
import { mockStudents } from './mockStudents';

const AllStudents = () => {
  const {
    searchTerm,
    filters,
    filteredStudents,
    setSearchTerm,
    setFilters,
    clearFilters
  } = useStudentFilters(mockStudents);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 50;

  // Student profile modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Calculate paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, studentsPerPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseProfile = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Student Master List & Records
      </h1>

      <SearchFilters
        searchTerm={searchTerm}
        filters={filters}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
        students={mockStudents}
      />

      <ActionBar 
        filteredCount={filteredStudents.length} 
        totalCount={mockStudents.length}
      />

      {/* Pass onViewProfile directly to StudentsTable */}
      <StudentsTable 
        students={paginatedStudents}
        currentPage={currentPage}
        totalPages={totalPages}
        totalStudents={filteredStudents.length}
        studentsPerPage={studentsPerPage}
        onPageChange={setCurrentPage}
        onViewProfile={handleViewProfile} // Make sure this is passed
      />

      <StudentProfileModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default AllStudents;