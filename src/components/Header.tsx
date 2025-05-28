import React from 'react';
import { LogOut, Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center">
        <img 
          src="/logo.svg" 
          alt="شركة الرمز العقارية" 
          className="h-8 w-auto ml-3" 
        />
        <div>
          <h1 className="text-lg font-bold">شركة الرمز العقارية</h1>
          <p className="text-xs text-slate-400">منصة إدارة راحة العملاء</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 transition-colors"
          title={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center bg-slate-700/50 rounded-full px-4 py-1.5">
          <User size={16} className="text-slate-300 ml-2" />
          <div className="text-right">
            <p className="text-sm font-medium">{user?.name || 'نواف'}</p>
            <p className="text-xs text-slate-400">{user?.role === 'admin' ? 'مدير النظام' : 'موظف'}</p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="p-2 rounded-full text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-1"
          title="تسجيل الخروج"
        >
          <LogOut size={18} />
          <span className="text-sm">تسجيل الخروج</span>
        </button>
      </div>
    </header>
  );
};

export default Header;