import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex h-full w-80 flex-col bg-white pt-5 pb-4">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <Sidebar closeSidebar={() => {}} />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header openSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;