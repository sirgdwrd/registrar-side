import React, { useState } from 'react';

const OverviewDashboard = ({ darkMode = false }) => {
  const [filters, setFilters] = useState({
    schoolYear: '2024-2025',
    gradeLevel: 'all',
    semester: 'all',
    dateRange: 'all'
  });

  // Theme classes
  const bgPrimary = darkMode ? 'bg-slate-900' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-slate-800' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = darkMode ? 'border-slate-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50';

  return (
    <div className={`space-y-6 animate-fadeIn ${darkMode ? 'dark' : ''}`}>
      <div className={`${bgPrimary} rounded-xl shadow-lg border ${borderColor} p-6 transition-all duration-300`}>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
           <h2 className={`text-3xl font-bold ${textPrimary} mb-6 tracking-tight`}> Registrar Performance Overview</h2>
        
        {/* Filter Controls - Dark Brown Bar */}
             
           
            <div className="flex gap-3">
              <button className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-700'} border ${borderColor} rounded-lg ${hoverBg} hover:shadow-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}>
                <span className="text-lg">🔄</span>
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <span className="text-lg">📊</span>
                Export Dashboard
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-4 gap-3 bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 p-4 rounded-xl shadow-xl">
            <select 
              value={filters.schoolYear}
              onChange={(e) => setFilters({...filters, schoolYear: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
            <select 
              value={filters.gradeLevel}
              onChange={(e) => setFilters({...filters, gradeLevel: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
            >
              <option value="all">All Grades</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
            </select>
            <select 
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
            >
              <option value="all">All Semesters</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
            </select>
            <select 
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
            >
              <option value="all">Select Date</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'} border-2 rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group`}>
            <div className={`text-5xl font-bold ${textPrimary} mb-2 animate-countUp group-hover:scale-110 transition-transform`}>1,248</div>
            <div className={`text-sm ${textSecondary} font-semibold mb-2 tracking-wide`}>Total Students</div>
            <div className="text-xs text-green-500 font-bold">↑ +2% from last year</div>
          </div>
          <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'} border-2 rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group`}>
            <div className={`text-5xl font-bold ${textPrimary} mb-2 animate-countUp group-hover:scale-110 transition-transform`}>156</div>
            <div className={`text-sm ${textSecondary} font-semibold mb-2 tracking-wide`}>New Enrollments</div>
            <div className="text-xs text-green-500 font-bold">↑ +5.7% from last quarter</div>
          </div>
          <div className={`${darkMode ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'} border-2 rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group`}>
            <div className={`text-5xl font-bold ${textPrimary} mb-2 animate-countUp group-hover:scale-110 transition-transform`}>94.3%</div>
            <div className={`text-sm ${textSecondary} font-semibold mb-2 tracking-wide`}>Attendance Rate</div>
            <div className="text-xs text-green-500 font-bold">↑ +0.8% from last month</div>
          </div>
          <div className={`${darkMode ? 'bg-gradient-to-br from-orange-900/50 to-orange-800/50 border-orange-700/50' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'} border-2 rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group`}>
            <div className={`text-5xl font-bold ${textPrimary} mb-2 animate-countUp group-hover:scale-110 transition-transform`}>12</div>
            <div className={`text-sm ${textSecondary} font-semibold mb-2 tracking-wide`}>Financial Holds</div>
            <div className="text-xs text-red-500 font-bold">↓ -3 from last week</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Enrollment Trends Chart */}
          <div className={`${bgPrimary} border-2 ${borderColor} rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
            <h3 className={`text-lg font-bold ${textPrimary} mb-4 tracking-tight`}>Enrollment Trends</h3>
            <div className={`h-64 ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-xl flex items-end justify-around p-4 gap-2 shadow-inner`}>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 animate-growUp shadow-lg group-hover:shadow-2xl" style={{height: '40%'}}></div>
                <span className={`text-xs ${textSecondary} font-bold`}>Jun</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 animate-growUp shadow-lg group-hover:shadow-2xl" style={{height: '55%', animationDelay: '0.1s'}}></div>
                <span className={`text-xs ${textSecondary} font-bold`}>Jul</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 animate-growUp shadow-lg group-hover:shadow-2xl" style={{height: '70%', animationDelay: '0.2s'}}></div>
                <span className={`text-xs ${textSecondary} font-bold`}>Aug</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 animate-growUp shadow-lg group-hover:shadow-2xl" style={{height: '85%', animationDelay: '0.3s'}}></div>
                <span className={`text-xs ${textSecondary} font-bold`}>Sep</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 animate-growUp shadow-xl group-hover:shadow-2xl" style={{height: '100%', animationDelay: '0.4s'}}></div>
                <span className={`text-xs ${textSecondary} font-bold`}>Oct</span>
              </div>
            </div>
          </div>

          {/* Student Distribution Pie Chart */}
          <div className={`${bgPrimary} border-2 ${borderColor} rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
            <h3 className={`text-lg font-bold ${textPrimary} mb-4 tracking-tight`}>Student Distribution by Grade</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-56 h-56">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke={darkMode ? '#334155' : '#E0E7FF'} strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#818CF8" strokeWidth="20" 
                    strokeDasharray="62.8 251.2" strokeDashoffset="0" className="hover:stroke-indigo-500 transition-all duration-300 cursor-pointer animate-drawCircle" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#A78BFA" strokeWidth="20" 
                    strokeDasharray="50.2 251.2" strokeDashoffset="-62.8" className="hover:stroke-purple-500 transition-all duration-300 cursor-pointer animate-drawCircle" style={{animationDelay: '0.5s'}} />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#C4B5FD" strokeWidth="20" 
                    strokeDasharray="62.8 251.2" strokeDashoffset="-113" className="hover:stroke-purple-400 transition-all duration-300 cursor-pointer animate-drawCircle" style={{animationDelay: '1s'}} />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#DDD6FE" strokeWidth="20" 
                    strokeDasharray="75.4 251.2" strokeDashoffset="-175.8" className="hover:stroke-purple-300 transition-all duration-300 cursor-pointer animate-drawCircle" style={{animationDelay: '1.5s'}} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${textPrimary}`}>1,248</div>
                    <div className={`text-xs ${textSecondary} font-medium`}>Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-indigo-400 shadow-lg"></div>
                <span className={`text-xs ${textSecondary} font-medium`}>Grade 7-8</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-400 shadow-lg"></div>
                <span className={`text-xs ${textSecondary} font-medium`}>Grade 9-10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { title: 'Application Conversion Rate', value: '78.5%', target: 'Target: 80%', progress: 78.5, result: '98.1%' },
            { title: 'Grade Submission Rate', value: '85.7%', target: 'Target: 90%', progress: 85.7, result: '95.2%', delay: 0.2 },
            { title: 'Transfer Processing Time', value: '2.3 days', target: 'Target: 2 days', progress: 87, result: '2-3 days', delay: 0.4 },
            { title: 'Parent Notification Rate', value: '96.2%', target: 'Target: 95%', progress: 96.2, result: '98.2%', delay: 0.6 }
          ].map((metric, index) => (
            <div key={index} className={`${bgPrimary} border-2 ${borderColor} rounded-xl p-5 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group`}>
              <h4 className={`text-sm font-bold ${textSecondary} mb-3 tracking-wide`}>{metric.title}</h4>
              <div className={`text-4xl font-bold ${textPrimary} mb-2 group-hover:scale-110 transition-transform`}>{metric.value}</div>
              <div className={`text-xs ${textSecondary} mb-3 font-medium`}>{metric.target}</div>
              <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-3 overflow-hidden shadow-inner`}>
                <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-3 rounded-full animate-progressBar shadow-lg" style={{width: `${metric.progress}%`, animationDelay: `${metric.delay || 0}s`}}></div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className={textSecondary}>{metric.target}</span>
                <span className="text-green-500 font-bold">{metric.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growUp {
          from { height: 0; opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.3); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes drawCircle {
          from { stroke-dashoffset: 251.2; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-growUp { animation: growUp 1s ease-out forwards; }
        .animate-progressBar { animation: progressBar 1.5s ease-out forwards; }
        .animate-countUp { animation: countUp 0.8s ease-out; }
        .animate-drawCircle { animation: drawCircle 1.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default OverviewDashboard;