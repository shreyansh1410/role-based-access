import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Users, 
  ShieldCheck, 
  Settings, 
  Home, 
  Menu 
} from 'lucide-react';
import { RoleProvider } from '../context/RoleContext';
import { UserProvider } from '../context/UserContext';
import RoleManagement from './RoleManagement';
import UserManagement from './UserManagement';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 
        transform transition-transform duration-300 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white dark:bg-gray-800 
        shadow-lg
        md:relative md:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Admin Dashboard
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden text-gray-600 dark:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('users')}
            className={`
              flex items-center w-full p-2 mb-2 rounded 
              ${activeTab === 'users' 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            <Users className="mr-2"/> User Management
          </button>
          
          <button 
            onClick={() => setActiveTab('roles')}
            className={`
              flex items-center w-full p-2 mb-2 rounded 
              ${activeTab === 'roles' 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            <ShieldCheck className="mr-2"/> Role Management
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="md:hidden text-gray-600 dark:text-gray-300"
            >
              <Menu />
            </button>
            
            <div className="flex items-center">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
          <RoleProvider>
            <UserProvider>
              {renderContent()}
            </UserProvider>
          </RoleProvider>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;