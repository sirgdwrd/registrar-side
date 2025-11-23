import React, { useState, useMemo } from 'react';
import SummaryCards from './SummaryCards';
import Filters from './Filters';
import ActionButtons from './ActionButtons';
import GradesTable from './GradesTable';
import { mockGradeSubmissions } from './mockData';

const GradeApproval = () => {
  const [filters, setFilters] = useState({
    gradingPeriod: '',
    gradeLevel: '',
    status: ''
  });

  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 50;

  // Filter submissions based on filters
  const filteredSubmissions = useMemo(() => {
    const result = mockGradeSubmissions.filter(submission => {
      const matchesGradingPeriod = filters.gradingPeriod === '' || submission.gradingPeriod === filters.gradingPeriod;
      const matchesGradeLevel = filters.gradeLevel === '' || submission.gradeLevel === filters.gradeLevel;
      const matchesStatus = filters.status === '' || submission.status === filters.status;
      
      return matchesGradingPeriod && matchesGradeLevel && matchesStatus;
    });
    
    console.log('Filtered submissions:', result);
    console.log('Current filters:', filters);
    return result;
  }, [filters]);

  // Filter out approved submissions from selectable ones
  const selectableSubmissions = useMemo(() => {
    return filteredSubmissions.filter(submission => submission.status !== 'Approved');
  }, [filteredSubmissions]);

  // Calculate paginated submissions
  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * submissionsPerPage;
    const endIndex = startIndex + submissionsPerPage;
    return filteredSubmissions.slice(startIndex, endIndex);
  }, [filteredSubmissions, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedSubmissions([]);
    setSelectAll(false);
  }, [filters]);

  // Calculate summary stats based on total students (148)
  const totalStudents = 148;
  const summaryStats = useMemo(() => {
    const submittedCount = mockGradeSubmissions.filter(s => s.status === 'Submitted').length;
    const approvedCount = mockGradeSubmissions.filter(s => s.status === 'Approved').length;
    const pendingCount = mockGradeSubmissions.filter(s => s.status === 'Pending').length;

    return {
      submittedGrades: submittedCount,
      approvedGrades: approvedCount,
      pendingReview: pendingCount,
      totalStudents: totalStudents
    };
  }, []);

  const handleSelectSubmission = (submissionId) => {
    // Only allow selection if submission is not approved
    const submission = filteredSubmissions.find(s => s.id === submissionId);
    if (submission && submission.status === 'Approved') {
      return; // Don't allow selection of approved submissions
    }

    setSelectedSubmissions(prev => 
      prev.includes(submissionId) 
        ? prev.filter(id => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubmissions([]);
    } else {
      // Only select non-approved submissions
      setSelectedSubmissions(selectableSubmissions.map(submission => submission.id));
    }
    setSelectAll(!selectAll);
  };

  const clearFilters = () => {
    setFilters({ gradingPeriod: '', gradeLevel: '', status: '' });
    setSelectedSubmissions([]);
    setSelectAll(false);
    setCurrentPage(1);
  };

  const handleExportGrades = () => {
    alert(`Exporting ${filteredSubmissions.length} grade submissions to Excel`);
  };

  const handleApproveAll = () => {
    alert(`Approving ${selectedSubmissions.length} selected grade submissions`);
    // In real app, this would update the status of selected submissions to "Approved"
    setSelectedSubmissions([]);
    setSelectAll(false);
  };

  const totalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Grade Submission & Approval
      </h1>

      <SummaryCards stats={summaryStats} />
      
      <Filters 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      <ActionButtons 
        selectedCount={selectedSubmissions.length}
        onExport={handleExportGrades}
        onApproveAll={handleApproveAll}
      />

      <GradesTable 
        submissions={paginatedSubmissions}
        selectedSubmissions={selectedSubmissions}
        selectAll={selectAll}
        onSelectSubmission={handleSelectSubmission}
        onSelectAll={handleSelectAll}
        currentPage={currentPage}
        totalPages={totalPages}
        totalSubmissions={filteredSubmissions.length}
        submissionsPerPage={submissionsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GradeApproval;