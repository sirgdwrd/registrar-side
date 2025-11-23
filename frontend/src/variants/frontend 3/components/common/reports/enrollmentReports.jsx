import React, { useState } from 'react';
import { Download } from 'lucide-react';

const EnrollmentReports = ({ darkMode = false }) => {
  const [reportType, setReportType] = useState('Enrollment Summary');
  const [timeFrame, setTimeFrame] = useState('Monthly');
  const [semester, setSemester] = useState('Previous Period');

  // Theme classes
  const bgPrimary = darkMode ? 'bg-slate-900' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-slate-800' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = darkMode ? 'border-slate-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50';
  const tableBg = darkMode ? 'bg-slate-800/50' : 'bg-gray-50';

  const enrollmentData = {
    totalStudents: 1248,
    newEnrollments: 156,
    transferees: 92,
    returningStudents: 1000,
    gradeEnrollment: [
      { grade: 'Grade 1', current: 156, capacity: 180, utilization: 86.2, yoyChange: '+12.3%' },
      { grade: 'Grade 2', current: 148, capacity: 180, utilization: 82.2, yoyChange: '+8.0%' },
      { grade: 'Grade 3', current: 142, capacity: 180, utilization: 78.9, yoyChange: '+5.2%' },
      { grade: 'Grade 4', current: 138, capacity: 180, utilization: 76.7, yoyChange: '-2.3%' },
      { grade: 'Grade 5', current: 135, capacity: 180, utilization: 75.0, yoyChange: '+3.8%' },
      { grade: 'Grade 6', current: 129, capacity: 180, utilization: 71.7, yoyChange: '+4.3%' }
    ],
    conversionPanel: [
      { stage: 'Inquiry Submitted', current: 245, conversionRate: 100, utilizationRate: 0 },
      { stage: 'Started Application', current: 197, conversionRate: 80.8, utilizationRate: 19.2 },
      { stage: 'Application Submitted', current: 152, conversionRate: 77.4, utilizationRate: 9.4 },
      { stage: 'Application Approved', current: 121, conversionRate: 68.6, utilizationRate: 2.8 },
      { stage: 'Payment Confirmed', current: 121, conversionRate: 68.6, utilizationRate: 49.0 },
      { stage: 'Enrollment', current: 121, conversionRate: 68.6, utilizationRate: 0 }
    ]
  };

  return (
    <div className={`space-y-6 animate-fadeIn ${darkMode ? 'dark' : ''}`}>
      {/* Title */}
      <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 transition-all duration-300`}>
        <h2 className={`text-3xl font-bold ${textPrimary} mb-6 tracking-tight`}>Enrollment Analytics and Reports</h2>
        
        {/* Filter Controls - Dark Brown Bar */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-xl">
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Report Type:</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Enrollment Summary</option>
              <option>Grade Level Analysis</option>
              <option>Application Pipeline</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Time Frame:</label>
            <select 
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Compare With:</label>
            <select 
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Previous Period</option>
              <option>Last Year</option>
              <option>Last Quarter</option>
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
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Total Students</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{enrollmentData.totalStudents.toLocaleString()}</p>
          <p className="text-green-500 text-sm font-bold">↑ +5.2% from last year</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>New Enrollments</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{enrollmentData.newEnrollments}</p>
          <p className="text-green-500 text-sm font-bold">↑ +12.7% from last quarter</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Transferees</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{enrollmentData.transferees}</p>
          <p className="text-green-500 text-sm font-bold">↑ +5 from last year</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Returning Students</h3>
          <p className={`text-5xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{enrollmentData.returningStudents.toLocaleString()}</p>
          <p className="text-green-500 text-sm font-bold">↑ +81 from last year</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment by Grade Level */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Enrollment by Grade Level</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Grade Level</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Current Enrollment</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Capacity</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Utilization Rate</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>YoY Change</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentData.gradeEnrollment.map((row, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01]`}>
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.grade}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.current}</td>
                    <td className={`py-4 px-4 text-sm text-center ${textSecondary} font-medium`}>{row.capacity}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.utilization}%</td>
                    <td className={`py-4 px-4 text-sm text-center font-bold ${row.yoyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {row.yoyChange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Conversion Panel */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Application Conversion Panel</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Stage</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Current Enrollment</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Conversion Rate</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Utilization Rate</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentData.conversionPanel.map((row, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01]`}>
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.stage}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.current}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.conversionRate}%</td>
                    <td className={`py-4 px-4 text-sm text-center ${textSecondary} font-medium`}>{row.utilizationRate}%</td>
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

export default EnrollmentReports;