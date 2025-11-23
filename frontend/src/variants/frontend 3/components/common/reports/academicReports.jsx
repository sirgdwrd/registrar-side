import React, { useState } from 'react';
import { Download } from 'lucide-react';

const AcademicReports = ({ darkMode = false }) => {
  const [quarter, setQuarter] = useState('Quarter 1 (Aug-Oct)');
  const [gradeLevel, setGradeLevel] = useState('Academic Summary');
  const [semester, setSemester] = useState('All Grades');

  // Theme classes
  const bgPrimary = darkMode ? 'bg-slate-900' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-slate-800' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = darkMode ? 'border-slate-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50';
  const tableBg = darkMode ? 'bg-slate-800/50' : 'bg-gray-50';

  const academicData = {
    averageGPA: 88.7,
    passingRate: 94.3,
    withHonors: 24,
    atRiskStudents: 5.7,
    subjectPerformance: [
      { subject: 'Mathematics', avgGrade: 89.2, highestGrade: 98, lowestGrade: 72, passRate: 96.8 },
      { subject: 'Science', avgGrade: 87.6, highestGrade: 96, lowestGrade: 75, passRate: 85.2 },
      { subject: 'English', avgGrade: 90.2, highestGrade: 99, lowestGrade: 78, passRate: 97.7 },
      { subject: 'Filipino', avgGrade: 88.5, highestGrade: 97, lowestGrade: 74, passRate: 96.1 },
      { subject: 'Araling Panlipunan', avgGrade: 86.9, highestGrade: 95, lowestGrade: 70, passRate: 94.3 }
    ],
    gradeDistribution: [
      { distribution: '95-100 (With Honors)', numStudents: 24, percentage: 1.9, cumulative: 1.9 },
      { distribution: '90-94 (Excellent)', numStudents: 156, percentage: 12.5, cumulative: 14.4 },
      { distribution: '85-89 (Very Good)', numStudents: 487, percentage: 39.0, cumulative: 53.4 },
      { distribution: '80-84 (Good)', numStudents: 423, percentage: 33.9, cumulative: 87.3 },
      { distribution: '75-79 (Satisfactory)', numStudents: 128, percentage: 10.3, cumulative: 97.5 },
      { distribution: 'Below 75', numStudents: 30, percentage: 2.4, cumulative: 100 }
    ]
  };

  return (
    <div className={`space-y-6 animate-fadeIn ${darkMode ? 'dark' : ''}`}>
      {/* Title and Controls */}
      <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 transition-all duration-300`}>
        <h2 className={`text-3xl font-bold ${textPrimary} mb-6 tracking-tight`}>Academic Performance Reports</h2>
        
        {/* Filter Controls - Dark Brown Bar */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-xl">
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Grading Period:</label>
            <select 
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Quarter 1 (Aug-Oct)</option>
              <option>Quarter 2 (Nov-Jan)</option>
              <option>Quarter 3 (Feb-Apr)</option>
              <option>Quarter 4 (May-Jul)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Report Type:</label>
            <select 
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Academic Summary</option>
              <option>Subject Analysis</option>
              <option>Honor Roll</option>
              <option>At-Risk Students</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Grade Level:</label>
            <select 
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>All Grades</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
            </select>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <span className="text-lg">🖨️</span>
              <span className="text-sm font-bold">Print Report</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <Download size={18} />
              <span className="text-sm font-bold">Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Average GPA</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{academicData.averageGPA}</p>
          <p className="text-green-500 text-sm font-bold">↑ +1.2 from last quarter</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Passing Rate</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{academicData.passingRate}%</p>
          <p className="text-green-500 text-sm font-bold">↑ +2.1% from last quarter</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>With Honors</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{academicData.withHonors}</p>
          <p className="text-green-500 text-sm font-bold">↑ +6 from last quarter</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>At Risk Students</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{academicData.atRiskStudents}%</p>
          <p className="text-red-500 text-sm font-bold">↑ +1.8% from last quarter</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Summary */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Subject Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Subject</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Average Grade</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Highest Grade</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Lowest Grade</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {academicData.subjectPerformance.map((row, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01]`}>
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.subject}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.avgGrade}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.highestGrade}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.lowestGrade}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.passRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Grade Distribution</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Grade Distribution</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Num of Students</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Percentage</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {academicData.gradeDistribution.map((row, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01]`}>
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.distribution}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.numStudents}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.percentage}%</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.cumulative}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default AcademicReports;