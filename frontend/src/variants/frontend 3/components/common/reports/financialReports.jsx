import React, { useState } from 'react';
import { Download } from 'lucide-react';

const FinancialReports = ({ darkMode = false }) => {
  const [reportType, setReportType] = useState('Financial Summary');
  const [timePeriod, setTimePeriod] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('All Methods');

  // Theme classes
  const bgPrimary = darkMode ? 'bg-slate-900' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-slate-800' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = darkMode ? 'border-slate-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50';
  const tableBg = darkMode ? 'bg-slate-800/50' : 'bg-gray-50';

  const financialData = {
    totalCollections: '₱3.24M',
    outstandingBalance: '₱187,500',
    activeFinancialHolds: 12,
    collectionRate: 97.1,
    feeCollection: [
      { feeType: 'Tuition Fee', amountDue: '₱2,850,000', amountCollected: '₱2,815,000', collectionRate: 98.7 },
      { feeType: 'Book Materials', amountDue: '₱152,000', amountCollected: '₱148,000', collectionRate: 95.8 },
      { feeType: 'Miscellaneous Fees', amountDue: '₱312,000', amountCollected: '₱287,500', collectionRate: 92.1 },
      { feeType: 'Other Fees', amountDue: '₱87,000', amountCollected: '₱75,200', collectionRate: 86.6 },
      { feeType: 'Total', amountDue: '₱3,373,000', amountCollected: '₱3,240,000', collectionRate: 97.1 }
    ],
    financialHolds: [
      { gradeLevel: 'Grade 1', studentsWithHolds: 2, totalOutstanding: '₱12,500', averagePerStudent: '₱6,250', status: 'Monitoring' },
      { gradeLevel: 'Grade 2', studentsWithHolds: 1, totalOutstanding: '₱15,000', averagePerStudent: '₱15,000', status: 'Resolving' },
      { gradeLevel: 'Grade 3', studentsWithHolds: 3, totalOutstanding: '₱28,750', averagePerStudent: '₱9,583', status: 'Attention Needed' },
      { gradeLevel: 'Grade 4', studentsWithHolds: 2, totalOutstanding: '₱45,000', averagePerStudent: '₱7,500', status: 'Monitoring' },
      { gradeLevel: 'Grade 5', studentsWithHolds: 3, totalOutstanding: '₱32,500', averagePerStudent: '₱10,833', status: 'Attention Needed' }
    ]
  };

  const getStatusColor = (status) => {
    if (status === 'Monitoring') return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    if (status === 'Resolving') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  return (
    <div className={`space-y-6 animate-fadeIn ${darkMode ? 'dark' : ''}`}>
      {/* Title and Controls */}
      <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 transition-all duration-300`}>
        <h2 className={`text-3xl font-bold ${textPrimary} mb-6 tracking-tight`}>Financial Report & Analytics</h2>
        
        {/* Filter Controls - Dark Brown Bar */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-xl">
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Report Type:</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Financial Summary</option>
              <option>Collection Report</option>
              <option>Outstanding Balances</option>
              <option>Payment History</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Time Period:</label>
            <select 
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Semester</option>
              <option>Annual</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-bold">Payment Method:</label>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:shadow-md cursor-pointer"
            >
              <option>All Methods</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Online Payment</option>
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
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Total Collections</h3>
          <p className={`text-4xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{financialData.totalCollections}</p>
          <p className="text-green-500 text-sm font-bold">↑ +8.7 from last quarter</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Outstanding Balance</h3>
          <p className={`text-4xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{financialData.outstandingBalance}</p>
          <p className="text-green-500 text-sm font-bold">↑ +12.3% from last month</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Active Financial Holds</h3>
          <p className={`text-4xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{financialData.activeFinancialHolds}</p>
          <p className="text-green-500 text-sm font-bold">↓ -3 from last week</p>
        </div>

        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer`}>
          <h3 className={`${textSecondary} text-sm font-bold mb-2 tracking-wide uppercase`}>Collection Rate</h3>
          <p className={`text-4xl font-bold ${textPrimary} mb-3 group-hover:scale-110 transition-transform`}>{financialData.collectionRate}%</p>
          <p className="text-green-500 text-sm font-bold">↑ +1.8% from last quarter</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection Summary */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Fee Collection Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Fee Type</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Amount Due</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Amount Collected</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Collection Rate</th>
                </tr>
              </thead>
              <tbody>
                {financialData.feeCollection.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01] ${
                      row.feeType === 'Total' ? `${tableBg} font-bold` : ''
                    }`}
                  >
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.feeType}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.amountDue}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.amountCollected}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.collectionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Holds by Grade Level */}
        <div className={`${bgPrimary} rounded-xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-4 tracking-tight`}>Financial Holds by Grade Level</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${tableBg} border-b-2 ${borderColor}`}>
                  <th className={`text-left py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Grade Level</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Students with Holds</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Total Outstanding</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Average per Student</th>
                  <th className={`text-center py-4 px-4 text-sm font-bold ${textPrimary} tracking-wide`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {financialData.financialHolds.map((row, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-all duration-200 hover:scale-[1.01]`}>
                    <td className={`py-4 px-4 text-sm font-bold ${textPrimary}`}>{row.gradeLevel}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.studentsWithHolds}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.totalOutstanding}</td>
                    <td className={`py-4 px-4 text-sm text-center font-semibold ${textPrimary}`}>{row.averagePerStudent}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getStatusColor(row.status)} transition-all duration-200 hover:scale-110`}>
                        {row.status}
                      </span>
                    </td>
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

export default FinancialReports;