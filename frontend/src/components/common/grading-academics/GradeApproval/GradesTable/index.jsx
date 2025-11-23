import React from 'react';
import GradesTable from './GradesTable';
import Pagination from './Pagination';

const GradesTableWrapper = ({ 
  submissions, 
  selectedSubmissions, 
  selectAll, 
  onSelectSubmission, 
  onSelectAll,
  currentPage,
  totalPages,
  totalSubmissions,
  submissionsPerPage,
  onPageChange
}) => {
  return (
    <div>
      <GradesTable 
        submissions={submissions}
        selectedSubmissions={selectedSubmissions}
        selectAll={selectAll}
        onSelectSubmission={onSelectSubmission}
        onSelectAll={onSelectAll}
      />
      
      {totalSubmissions > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalSubmissions}
          itemsPerPage={submissionsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default GradesTableWrapper;