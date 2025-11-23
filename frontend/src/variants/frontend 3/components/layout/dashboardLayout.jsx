import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../common/dashboardSidebar';
import DashboardHeader from '../common/dashboardHeader';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className='flex h-screen bg-[#F9F9F9] dark:bg-slate-900 overflow-hidden'>
      <DashboardSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F9F9F9] dark:bg-slate-900">
        <DashboardHeader
          setMobileOpen={setMobileOpen}
        />
        <main className='flex-1 overflow-y-auto p-6 bg-[#F9F9F9] dark:bg-slate-900'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;