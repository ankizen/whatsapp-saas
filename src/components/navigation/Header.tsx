import React from 'react';
import { Menu, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            onClick={openSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-800">
            {user?.whatsappConnected 
              ? 'Your WhatsApp Business Account is Connected' 
              : 'Connect your WhatsApp Business Account'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {!user?.whatsappConnected && (
            <button
              type="button"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Connect WhatsApp
            </button>
          )}
          
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Bell className="h-6 w-6" />
          </button>
          
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;