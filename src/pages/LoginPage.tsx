import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, isLoading, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(username, password);
      toast.success('تم تسجيل الدخول بنجاح');
    } catch (error) {
      toast.error('فشل تسجيل الدخول: اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Logo" 
            className="w-24 h-auto"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في منصة قسم إدارة راحة العملاء</h1>
        <p className="text-slate-400 mb-8">شركة الرمز العقارية</p>
        
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-right mb-2 font-medium">
                اسم المستخدم
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-right mb-2 font-medium">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
            >
              {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-sm text-slate-500">
          جميع الحقوق محفوظة © 2025 شركة الرمز العقارية
        </p>
      </div>
    </div>
  );
};

export default LoginPage;