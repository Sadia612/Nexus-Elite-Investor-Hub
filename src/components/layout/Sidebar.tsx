import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, MessageSquare, Calendar, 
  Bell, FileText, Settings, HelpCircle, Briefcase, CreditCard
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/entrepreneur' },
  { icon: Users, label: 'Find Investors', path: '/investors' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Calendar, label: 'Meetings', path: '/meetings' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Briefcase, label: 'Deals', path: '/deals' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};