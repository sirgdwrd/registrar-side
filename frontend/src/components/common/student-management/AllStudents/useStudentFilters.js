import { useState, useMemo } from 'react';

export const useStudentFilters = (students) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    gradeLevel: '',
    section: ''
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.parentGuardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.contactNumber.includes(searchTerm);

      const matchesStatus = filters.status === '' || student.status === filters.status;
      const matchesGrade = filters.gradeLevel === '' || student.gradeLevel === filters.gradeLevel;
      const matchesSection = filters.section === '' || student.section === filters.section;

      return matchesSearch && matchesStatus && matchesGrade && matchesSection;
    });
  }, [students, searchTerm, filters]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', gradeLevel: '', section: '' });
  };

  return {
    searchTerm,
    filters,
    filteredStudents,
    setSearchTerm,
    setFilters,
    clearFilters
  };
};