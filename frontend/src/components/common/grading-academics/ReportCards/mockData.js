export const mockReportCards = [
  {
    id: 1,
    studentName: "Juan Dela Cruz",
    gradeLevel: "Grade 1",
    section: "Morning", // CHANGED
    gpa: 85.5,
    status: "Ready",
    releaseDate: null,
    gradingPeriod: "Q1",
    reportCardFile: "report_card_juan_q1.pdf"
  },
  {
    id: 2,
    studentName: "Maria Santos",
    gradeLevel: "Grade 1",
    section: "Morning", // CHANGED
    gpa: 92.0,
    status: "Released",
    releaseDate: "2024-03-25",
    gradingPeriod: "Q1",
    reportCardFile: "report_card_maria_q1.pdf"
  },
  {
    id: 3,
    studentName: "Pedro Reyes",
    gradeLevel: "Grade 2",
    section: "Afternoon", // CHANGED
    gpa: 78.5,
    status: "Pending",
    releaseDate: null,
    gradingPeriod: "Q1",
    reportCardFile: null
  },
  {
    id: 4,
    studentName: "Anna Lim",
    gradeLevel: "Grade 3",
    section: "Morning", // CHANGED
    gpa: 88.0,
    status: "Ready",
    releaseDate: null,
    gradingPeriod: "Q1",
    reportCardFile: "report_card_anna_q1.pdf"
  },
  {
    id: 5,
    studentName: "Miguel Torres",
    gradeLevel: "Grade 4",
    section: "Afternoon", // CHANGED
    gpa: 81.5,
    status: "Released",
    releaseDate: "2024-03-24",
    gradingPeriod: "Q1",
    reportCardFile: "report_card_miguel_q1.pdf"
  }
];

// Generate remaining mock data to reach 148 students
const generateMockData = () => {
  const firstNames = ['Juan', 'Maria', 'Pedro', 'Anna', 'Miguel', 'Sofia', 'Luis', 'Elena', 'Carlos', 'Isabel', 'Jose', 'Carmen', 'Antonio', 'Rosa', 'Francisco'];
  const lastNames = ['Dela Cruz', 'Santos', 'Reyes', 'Lim', 'Torres', 'Garcia', 'Rivera', 'Fernandez', 'Gonzales', 'Lopez', 'Mendoza', 'Castillo', 'Villanueva', 'Romero', 'Aquino'];
  const gradeLevels = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  const sections = ['Morning', 'Afternoon']; // CHANGED FROM A, B, C
  const gradingPeriods = ['Q1', 'Q2', 'Q3', 'Q4'];
  const statuses = ['Pending', 'Ready', 'Released'];

  const additionalData = [];
  
  for (let i = 6; i <= 148; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const gradeLevel = gradeLevels[Math.floor(Math.random() * gradeLevels.length)];
    const section = sections[Math.floor(Math.random() * sections.length)]; // NOW Morning/Afternoon
    const gradingPeriod = gradingPeriods[Math.floor(Math.random() * gradingPeriods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const gpa = (Math.random() * 25 + 75).toFixed(1);
    
    additionalData.push({
      id: i,
      studentName: `${firstName} ${lastName}`,
      gradeLevel,
      section, // NOW Morning/Afternoon
      gpa: parseFloat(gpa),
      status,
      releaseDate: status === 'Released' ? '2024-03-' + (Math.floor(Math.random() * 5) + 20) : null,
      gradingPeriod,
      reportCardFile: status !== 'Pending' ? `report_card_${firstName.toLowerCase()}_${lastName.toLowerCase()}_${gradingPeriod.toLowerCase()}.pdf` : null
    });
  }
  
  return [...mockReportCards, ...additionalData];
};

export const fullMockReportCards = generateMockData();