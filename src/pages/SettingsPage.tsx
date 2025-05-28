import React, { useState, useEffect } from 'react';
import { User, Moon, Sun, UserPlus, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// Mock data - to be replaced with API calls
const mockEmployees = [
  {
    id: '1',
    username: 'nawaf',
    name: 'نواف',
    role: 'admin',
    permissions: ['dashboard', 'data_entry', 'complaints', 'delivery', 'analytics', 'settings'],
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: 'ahmed',
    name: 'أحمد',
    role: 'user',
    permissions: ['dashboard', 'data_entry', 'complaints'],
    created_at: '2025-01-05T00:00:00Z'
  },
  {
    id: '3',
    username: 'fatima',
    name: 'فاطمة',
    role: 'user',
    permissions: ['dashboard', 'analytics'],
    created_at: '2025-01-10T00:00:00Z'
  }
];

const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState(mockEmployees);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    username: '',
    password: '',
    role: 'user',
    permissions: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission: string) => {
    setNewEmployee(prev => {
      const permissions = [...prev.permissions];
      
      if (permissions.includes(permission)) {
        return { ...prev, permissions: permissions.filter(p => p !== permission) };
      } else {
        return { ...prev, permissions: [...permissions, permission] };
      }
    });
  };

  const handleAddEmployee = () => {
    // Reset form and open modal
    setNewEmployee({
      name: '',
      username: '',
      password: '',
      role: 'user',
      permissions: []
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newEmployee.name || !newEmployee.username || !newEmployee.password) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    
    if (newEmployee.permissions.length === 0) {
      toast.error('الرجاء اختيار صلاحية واحدة على الأقل');
      return;
    }
    
    // Check if username already exists
    if (employees.some(emp => emp.username === newEmployee.username)) {
      toast.error('اسم المستخدم موجود بالفعل');
      return;
    }
    
    // Add new employee
    const employeeToAdd = {
      id: String(employees.length + 1),
      username: newEmployee.username,
      name: newEmployee.name,
      role: newEmployee.role,
      permissions: newEmployee.permissions,
      created_at: new Date().toISOString()
    };
    
    setEmployees([...employees, employeeToAdd]);
    toast.success('تم إضافة الموظف بنجاح');
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    if (id === '1') {
      toast.error('لا يمكن حذف المستخدم الرئيسي');
      return;
    }
    
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الموظف؟')) {
      setEmployees(employees.filter(employee => employee.id !== id));
      toast.success('تم حذف الموظف بنجاح');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`تم تغيير وضع العرض إلى ${isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">الموظفين</h2>
          
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleAddEmployee}
              className="btn btn-primary flex items-center"
            >
              <UserPlus size={18} className="ml-2" />
              إضافة موظف جديد
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>اسم المستخدم</th>
                  <th>الاسم</th>
                  <th>الصلاحيات</th>
                  <th>تاريخ الإضافة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.username}</td>
                    <td>{employee.name}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {employee.permissions.map(permission => {
                          let label = '';
                          let bgColor = '';
                          
                          switch (permission) {
                            case 'dashboard':
                              label = 'لوحة التحكم';
                              bgColor = 'bg-blue-900 text-blue-300';
                              break;
                            case 'data_entry':
                              label = 'إدخال البيانات';
                              bgColor = 'bg-green-900 text-green-300';
                              break;
                            case 'complaints':
                              label = 'الشكاوى';
                              bgColor = 'bg-yellow-900 text-yellow-300';
                              break;
                            case 'delivery':
                              label = 'التسليم';
                              bgColor = 'bg-purple-900 text-purple-300';
                              break;
                            case 'analytics':
                              label = 'التحليلات';
                              bgColor = 'bg-pink-900 text-pink-300';
                              break;
                            case 'settings':
                              label = 'الإعدادات';
                              bgColor = 'bg-red-900 text-red-300';
                              break;
                            default:
                              label = permission;
                              bgColor = 'bg-slate-700 text-slate-300';
                          }
                          
                          return (
                            <span key={permission} className={`px-2 py-1 rounded-full text-xs ${bgColor}`}>
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td>{new Date(employee.created_at).toLocaleDateString('ar-SA')}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                        disabled={employee.id === '1'}
                        title={employee.id === '1' ? 'لا يمكن حذف المستخدم الرئيسي' : 'حذف'}
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">إعدادات النظام</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">وضع العرض</h3>
              
              <div className="flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                
                <span className="mr-3">
                  {isDarkMode ? (
                    <Moon size={18} className="inline-block ml-1" />
                  ) : (
                    <Sun size={18} className="inline-block ml-1" />
                  )}
                  {isDarkMode ? 'داكن' : 'فاتح'}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">تسجيل الخروج</h3>
              
              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding new employee */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">إضافة موظف جديد</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">اسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  value={newEmployee.username}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">الدور</label>
                <select
                  name="role"
                  value={newEmployee.role}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="user">مستخدم</option>
                  <option value="admin">مدير</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">الصلاحيات</label>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('dashboard')}
                      onChange={() => handlePermissionChange('dashboard')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">لوحة التحكم</span>
                  </label>
                  
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('data_entry')}
                      onChange={() => handlePermissionChange('data_entry')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">إدخال البيانات</span>
                  </label>
                  
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('complaints')}
                      onChange={() => handlePermissionChange('complaints')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">الشكاوى</span>
                  </label>
                  
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('delivery')}
                      onChange={() => handlePermissionChange('delivery')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">التسليم</span>
                  </label>
                  
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('analytics')}
                      onChange={() => handlePermissionChange('analytics')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">التحليلات</span>
                  </label>
                  
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEmployee.permissions.includes('settings')}
                      onChange={() => handlePermissionChange('settings')}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="mr-2">الإعدادات</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  إلغاء
                </button>
                
                <button type="submit" className="btn btn-primary">
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;