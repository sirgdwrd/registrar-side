import React, { useState } from 'react';
import SummaryCards from './SummaryCards';
import Filters from './Filters';
import ActionButtons from './ActionButtons';
import StudentsTable from './StudentsTable';

const EnrollmentCompletion = () => {
      // State for filters
  const [filters, setFilters] = useState({
    paymentMethod: '',
    paymentStatus: '',
    gradeLevel: ''
  });

  // State for selected students
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

const [students] = useState([
  {
    id: 1,
    name: 'Maria Santos',
    gradeLevel: 'Grade 1',
    paymentMethod: 'OTC',
    amount: 2500,
    status: 'Scheduled',
    completed: false,
    scheduledDate: '2024-01-15',
    referenceNumber: '',
    dateAdded: '2024-01-10'
  },
  {
    id: 2,
    name: 'Juan Dela Cruz',
    gradeLevel: 'Grade 3',
    paymentMethod: 'GCash',
    amount: 2800,
    status: 'Payment Pending',
    completed: false,
    scheduledDate: '',
    referenceNumber: 'GC-789123',
    dateAdded: '2024-01-11'
  },
  {
    id: 3,
    name: 'Ana Reyes',
    gradeLevel: 'Grade 2',
    paymentMethod: 'Bank Transfer',
    amount: 2600,
    status: 'Payment Pending',
    completed: false,
    scheduledDate: '',
    referenceNumber: 'BT-456789',
    dateAdded: '2024-01-12',
    // New bank-specific fields
    bankName: 'BPI',
    accountLast4: '1234'
  },
  {
    id: 4,
    name: 'Luis Garcia',
    gradeLevel: 'Grade 4',
    paymentMethod: 'OTC',
    amount: 3000,
    status: 'Scheduled',
    completed: false,
    scheduledDate: '2024-01-18',
    referenceNumber: '',
    dateAdded: '2024-01-13'
  },
  {
    id: 5,
    name: 'Sofia Martinez',
    gradeLevel: 'Grade 1',
    paymentMethod: 'Bank Transfer',
    amount: 2500,
    status: 'Payment Pending',
    completed: false,
    scheduledDate: '',
    referenceNumber: 'BT-987654',
    dateAdded: '2024-01-09',
    // New bank-specific fields
    bankName: 'BDO',
    accountLast4: '5678'
  }
]);

  // Calculate summary numbers
  const summary = {
    scheduledOTC: students.filter(s => s.paymentMethod === 'OTC' && s.status === 'Scheduled').length,
    gcashToConfirm: students.filter(s => s.paymentMethod === 'GCash' && s.status === 'Payment Pending').length,
    completedToday: students.filter(s => s.completed).length,
    totalEnrolled: students.length
  };

  // Filter students based on selected filters
  const filteredStudents = students.filter(student => {
    return (
      (filters.paymentMethod === '' || student.paymentMethod === filters.paymentMethod) &&
      (filters.paymentStatus === '' || student.status === filters.paymentStatus) &&
      (filters.gradeLevel === '' || student.gradeLevel === filters.gradeLevel)
    );
  });

  // Handle individual checkbox selection
  const handleStudentSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle complete selected
  const handleCompleteSelected = () => {
    console.log('Completing students:', selectedStudents);
    alert(`Marked ${selectedStudents.length} students as completed!`);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  // Handle export list
  const handleExportList = () => {
    console.log('Exporting student list');
    alert('Export functionality would be implemented here!');
  };

  return (
    <div>
<h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Payment Confirmation & Enrollment Completion</h1>      
      <SummaryCards summary={summary} />
      <Filters filters={filters} setFilters={setFilters} />
      <ActionButtons 
        selectedCount={selectedStudents.length}
        totalCount={filteredStudents.length}
        onExport={handleExportList}
        onCompleteSelected={handleCompleteSelected}
      />
      <StudentsTable 
        students={filteredStudents}
        selectedStudents={selectedStudents}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        onStudentSelect={handleStudentSelect}
      />
    </div>
  );
};

export default EnrollmentCompletion;