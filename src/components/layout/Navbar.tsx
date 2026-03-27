import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <div className="w-6 h-6 text-white font-bold">BN</div>
        </div>
        <span className="text-xl font-bold text-gray-900">Business Nexus</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">Sarah Johnson</p>
            <p className="text-xs text-gray-500 text-uppercase">Entrepreneur</p>
          </div>
          <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff" className="w-9 h-9 rounded-full border border-gray-200" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};