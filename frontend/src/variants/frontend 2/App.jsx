import React from 'react';
// 1. Import Navigate
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DarkModeProvider from './components/DarkModeProvider';
import DashboardLayout from './components/layout/dashboardLayout';
import DashboardPage from './components/pages/dashboardPage';
import ApplicationPage from './components/pages/applicationPage';
import StudentPage from './components/pages/studentPage';
import GradingPage from './components/pages/gradingPage';
import RecordPage from './components/pages/recordPage';
import ReportsPage from './components/pages/reportsPage';
import HelpSupportPage from './components/pages/helpSupportPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/registrar-dashboard" replace />} />
            <Route path="/registrar-dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="application-management" element={<ApplicationPage />} />
              <Route path="student-management" element={<StudentPage />} />
              <Route path="grading-academics" element={<GradingPage />} />
              <Route path="record-and-archives" element={<RecordPage />} />
              <Route path="report-and-analytics" element={<ReportsPage />} />
              <Route path="help-and-support" element={<HelpSupportPage />} />
            </Route>
          </Routes>
        </DarkModeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;