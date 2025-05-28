import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 text-center text-sm text-slate-500 border-t border-slate-800">
          <p>جميع الحقوق محفوظة © 2025 شركة الرمز العقارية</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;