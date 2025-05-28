import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart, 
  ClipboardList, 
  Home, 
  Settings, 
  MessageSquare, 
  FileText,
  PieChart,
  Building
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-800 border-l border-slate-700 flex flex-col">
      <div className="p-6 flex justify-center border-b border-slate-700">
        <img 
          src="https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Logo" 
          className="h-12 w-auto"
        />
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <Home size={20} className="ml-3" />
              <span>لوحة التحكم</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/data-entry"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <FileText size={20} className="ml-3" />
              <span>إدخال البيانات</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/complaints"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <MessageSquare size={20} className="ml-3" />
              <span>الشكاوى</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/delivery"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <Building size={20} className="ml-3" />
              <span>قسم التسليم</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <PieChart size={20} className="ml-3" />
              <span>التحليلات</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-slate-700 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`
              }
            >
              <Settings size={20} className="ml-3" />
              <span>الإعدادات</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;