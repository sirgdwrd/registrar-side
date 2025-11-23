import React from 'react';
import StudentsTable from './StudentsTable';
import Pagination from './Pagination';

const StudentsTableWrapper = ({ 
  students, 
  selectedStudents, 
  selectAll, 
  onSelectStudent, 
  onSelectAll,
  currentPage,
  totalPages,
  totalStudents,
  studentsPerPage,
  onPageChange,
  onViewProfile  // Make sure this prop is received
}) => {
  
  return (
    <div>
      <StudentsTable 
        students={students}
        selectedStudents={selectedStudents}
        selectAll={selectAll}
        onSelectStudent={onSelectStudent}
        onSelectAll={onSelectAll}
        onViewProfile={onViewProfile}  // Make sure it's passed here
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