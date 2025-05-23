import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Send, 
  Settings, 
  X, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const { user, logout } = useAuth();
  
  const navigationItems = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Templates', to: '/dashboard/templates', icon: FileText },
    { name: 'Bulk Messaging', to: '/dashboard/messaging', icon: Send },
    { name: 'Conversations', to: '/dashboard/conversations', icon: MessageSquare },
    { name: 'Settings', to: '/dashboard/settings', icon: Settings }
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 lg:hidden">
        <div className="flex items-center">
          <span className="text-xl font-bold text-emerald-600">WhatsApp Cloud</span>
        </div>
        <button onClick={closeSidebar}>
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      <div className="hidden items-center justify-center py-6 lg:flex">
        <span className="text-xl font-bold text-emerald-600">WhatsApp Cloud</span>
      </div>
      
      {/* Business info */}
      <div className="mb-6 mt-2 px-4">
        <div className="rounded-lg bg-emerald-50 p-4">
          <p className="font-medium text-emerald-800">{user?.businessName}</p>
          <p className="text-sm text-emerald-600">{user?.whatsappConnected ? 'WhatsApp Connected' : 'Not Connected'}</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => 
              `group flex items-center rounded-md px-2 py-3 text-sm font-medium ${
                isActive 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* User profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;