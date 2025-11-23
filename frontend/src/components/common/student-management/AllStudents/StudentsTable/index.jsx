import React from 'react';
import StudentsTable from './StudentsTable';
import Pagination from './Pagination';

const StudentsTableWrapper = ({ 
  students, 
  currentPage, 
  totalPages, 
  totalStudents, 
  studentsPerPage,
  onPageChange,
  onViewProfile  // Add this prop
}) => {
  return (
    <div>
      {/* Pass onViewProfile to the actual StudentsTable component */}
      <StudentsTable 
        students={students} 
        onViewProfile={onViewProfile}  // Pass it here
      />
      
      {totalStudents > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalStudents={totalStudents}
          studentsPerPage={studentsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default StudentsTableWrapper;