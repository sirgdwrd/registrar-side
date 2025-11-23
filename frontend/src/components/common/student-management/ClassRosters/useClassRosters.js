import { useState } from 'react';

export const useClassRosters = () => {
  // State for filters
  const [filters, setFilters] = useState({
    gradeLevel: '',
    section: '',
    advisoryTeacher: ''
  });

  // State for selected section
  const [selectedSection, setSelectedSection] = useState(null);

  // Modal states
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showNotifyTeacherModal, setShowNotifyTeacherModal] = useState(false);
  const [showNotifyParentsModal, setShowNotifyParentsModal] = useState(false);

  // Add confirmation modal states
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  // Add toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Mock data for sections
  const sections = [
    {
      id: 1,
      gradeLevel: 'Grade 1',
      section: 'Morning',
      advisoryTeacher: 'Ms. Maria Santos',
      classSchedule: '7:00 AM - 12:00 PM, Mon-Fri',
      studentsEnrolled: 12,
      capacity: 15
    },
    {
      id: 2,
      gradeLevel: 'Grade 1',
      section: 'Afternoon',
      advisoryTeacher: 'Mr. Juan Dela Cruz',
      classSchedule: '1:00 PM - 6:00 PM, Mon-Fri',
      studentsEnrolled: 14,
      capacity: 15
    },
    {
      id: 3,
      gradeLevel: 'Grade 2',
      section: 'Morning',
      advisoryTeacher: 'Ms. Ana Reyes',
      classSchedule: '7:00 AM - 12:00 PM, Mon-Fri',
      studentsEnrolled: 13,
      capacity: 15
    },
    {
      id: 4,
      gradeLevel: 'Grade 2',
      section: 'Afternoon',
      advisoryTeacher: 'Mr. Luis Garcia',
      classSchedule: '1:00 PM - 6:00 PM, Mon-Fri',
      studentsEnrolled: 11,
      capacity: 15
    },
    {
      id: 5,
      gradeLevel: 'Grade 3',
      section: 'Morning',
      advisoryTeacher: 'Ms. Sofia Martinez',
      classSchedule: '7:00 AM - 12:00 PM, Mon-Fri',
      studentsEnrolled: 15,
      capacity: 15
    },
    {
      id: 6,
      gradeLevel: 'Grade 3',
      section: 'Afternoon',
      advisoryTeacher: 'Mr. Carlos Lim',
      classSchedule: '1:00 PM - 6:00 PM, Mon-Fri',
      studentsEnrolled: 10,
      capacity: 15
    }
  ];

  // Mock data for students
  const students = [
    {
      id: 1,
      studentId: '2024-00123',
      name: 'Althea Rodriguez',
      parentGuardian: 'Maricel Rodriguez',
      contactNumber: '+63 912 345 6789',
      enrollmentDate: '2024-01-15',
      status: 'Active',
      sectionId: 1
    },
    {
      id: 2,
      studentId: '2024-00124',
      name: 'Brandon Cruz',
      parentGuardian: 'Roberto Cruz',
      contactNumber: '+63 917 234 5678',
      enrollmentDate: '2024-01-16',
      status: 'Active',
      sectionId: 1
    },
    {
      id: 3,
      studentId: '2024-00125',
      name: 'Chloe Tan',
      parentGuardian: 'Michael Tan',
      contactNumber: '+63 918 345 6789',
      enrollmentDate: '2024-01-10',
      status: 'Active',
      sectionId: 2
    },
    {
      id: 4,
      studentId: '2024-00126',
      name: 'Daniel Lim',
      parentGuardian: 'Jennifer Lim',
      contactNumber: '+63 919 456 7890',
      enrollmentDate: '2024-01-12',
      status: 'Dropout',
      sectionId: 1
    },
    {
      id: 5,
      studentId: '2024-00127',
      name: 'Ella Sy',
      parentGuardian: 'David Sy',
      contactNumber: '+63 920 567 8901',
      enrollmentDate: '2024-01-18',
      status: 'Active',
      sectionId: 3
    },
    {
      id: 6,
      studentId: '2024-00128',
      name: 'Francisco Reyes',
      parentGuardian: 'Angela Reyes',
      contactNumber: '+63 921 678 9012',
      enrollmentDate: '2024-01-09',
      status: 'Expelled',
      sectionId: 2
    },
    {
      id: 7,
      studentId: '2024-00129',
      name: 'Gabriella Ong',
      parentGuardian: 'Richard Ong',
      contactNumber: '+63 922 789 0123',
      enrollmentDate: '2024-01-14',
      status: 'Active',
      sectionId: 1
    },
    {
      id: 8,
      studentId: '2024-00130',
      name: 'Hector dela Cruz',
      parentGuardian: 'Lorna dela Cruz',
      contactNumber: '+63 923 890 1234',
      enrollmentDate: '2024-01-11',
      status: 'Active',
      sectionId: 2
    }
  ];

  // Filter sections based on selected filters
  const filteredSections = sections.filter(section => {
    return (
      (filters.gradeLevel === '' || section.gradeLevel === filters.gradeLevel) &&
      (filters.section === '' || section.section === filters.section) &&
      (filters.advisoryTeacher === '' || section.advisoryTeacher === filters.advisoryTeacher)
    );
  });

  // Filter students by selected section
  const filteredStudents = selectedSection
    ? students.filter(student => student.sectionId === selectedSection.id)
    : [];

  // Get unique values for filter options
  const gradeLevels = [...new Set(sections.map(s => s.gradeLevel))];
  const sectionsList = [...new Set(sections.map(s => s.section))];
  const teachers = [...new Set(sections.map(s => s.advisoryTeacher))];

  // Action handlers
  const handlePrintRosters = () => {
    setShowPrintModal(true);
  };

  const handleNotifyTeachers = () => {
    setShowNotifyTeacherModal(true);
  };

  const handleNotifyParents = () => {
    setShowNotifyParentsModal(true);
  };

  // Show toast function
  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  // Hide toast function
  const hideToast = () => {
    setToast({
      isVisible: false,
      message: '',
      type: 'success'
    });
  };

  // New confirmation handler - triggered from modals
  const handleConfirmation = (action, data) => {
    setConfirmationAction(action);
    setConfirmationData(data);
    setShowConfirmationModal(true);
  };

  // Execute confirmed action
  const executeConfirmedAction = () => {
    if (confirmationAction && confirmationData) {
      // Close the original modal first and execute the action
      if (confirmationAction === 'print') {
        setShowPrintModal(false);
        handleConfirmPrint(confirmationData);
        showToast(`Roster for ${selectedSection.gradeLevel} - ${selectedSection.section} generated successfully!`);
      } else if (confirmationAction === 'notifyTeacher') {
        setShowNotifyTeacherModal(false);
        handleConfirmTeacherNotification(confirmationData);
        showToast(`Notification sent to ${selectedSection.advisoryTeacher} successfully!`);
      } else if (confirmationAction === 'notifyParents') {
        setShowNotifyParentsModal(false);
        handleConfirmParentNotification(confirmationData);
        const studentCount = confirmationData.selectedStudents.length;
        showToast(`Notification sent to ${studentCount} parents successfully!`);
      }
    }
    // Close confirmation modal
    setShowConfirmationModal(false);
  };

  // Updated confirmation handlers (alerts removed - toast used instead)
  const handleConfirmPrint = (printOptions) => {
    console.log('Printing with options:', printOptions);
    console.log(`Printing roster for ${selectedSection.gradeLevel} - ${selectedSection.section} with format: ${printOptions.format}`);
    // Actual printing logic would go here
  };

  const handleConfirmTeacherNotification = (notification) => {
    console.log('Sending teacher notification:', notification);
    console.log(`Notification sent to ${selectedSection.advisoryTeacher}: ${notification.customMessage}`);
    // Actual notification logic would go here
  };

  const handleConfirmParentNotification = (notification) => {
    console.log('Sending parent notifications:', notification);
    const studentCount = notification.selectedStudents.length;
    console.log(`Notification sent to ${studentCount} parents via ${notification.deliveryMethod}`);
    // Actual parent notification logic would go here
  };

  const clearFilters = () => {
    setFilters({ gradeLevel: '', section: '', advisoryTeacher: '' });
  };

  return {
    // Filter and selection states
    filters,
    setFilters,
    selectedSection,
    setSelectedSection,
    
    // Data
    filteredSections,
    filteredStudents,
    gradeLevels,
    sectionsList,
    teachers,
    
    // Modal states
    showPrintModal,
    showNotifyTeacherModal,
    showNotifyParentsModal,
    setShowPrintModal,
    setShowNotifyTeacherModal,
    setShowNotifyParentsModal,
    
    // New confirmation modal states
    showConfirmationModal,
    setShowConfirmationModal,
    confirmationAction,
    confirmationData,
    
    // Toast state
    toast,
    showToast,
    hideToast,
    
    // Action handlers
    handlePrintRosters,
    handleNotifyTeachers,
    handleNotifyParents,
    handleConfirmPrint,
    handleConfirmTeacherNotification,
    handleConfirmParentNotification,
    
    // New confirmation handlers
    handleConfirmation,
    executeConfirmedAction,
    
    // Utility functions
    clearFilters
  };
};