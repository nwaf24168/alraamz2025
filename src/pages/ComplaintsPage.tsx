import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Complaint } from '../types';
import { PlusCircle, Trash2, Eye, Search } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - to be replaced with API calls
const mockComplaints: Complaint[] = [
  {
    id: '1',
    ticket_number: 'TCKT-123456',
    priority: 'high',
    date: '2025-01-15',
    customer: 'أحمد الشمري',
    project: 'الشمالي',
    unit_number: 'A-42',
    complaint_source: 'هاتف',
    status: 'pending',
    request_number: 'REQ-7890',
    complaint_description: 'تسرب مياه في الحمام الرئيسي',
    maintenance_action: 'تم إرسال فريق الصيانة',
    action_taken: 'تم إصلاح التسرب واستبدال الأنابيب التالفة',
    complaint_duration: '3 أيام',
    expected_resolution_time: '2025-01-18',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T14:20:00Z',
    updated_by: 'nawaf'
  },
  {
    id: '2',
    ticket_number: 'TCKT-123457',
    priority: 'medium',
    date: '2025-01-14',
    customer: 'سارة العتيبي',
    project: 'الشرقي',
    unit_number: 'B-18',
    complaint_source: 'زيارة',
    status: 'resolved',
    request_number: 'REQ-7891',
    complaint_description: 'مشكلة في نظام التكييف',
    maintenance_action: 'فحص وإصلاح وحدة التكييف',
    action_taken: 'تم تنظيف الفلاتر واستبدال قطع الغيار المعطوبة',
    complaint_duration: '2 أيام',
    expected_resolution_time: '2025-01-16',
    created_at: '2025-01-14T09:15:00Z',
    updated_at: '2025-01-16T11:45:00Z',
    updated_by: 'nawaf'
  },
  {
    id: '3',
    ticket_number: 'TCKT-123458',
    priority: 'low',
    date: '2025-01-13',
    customer: 'محمد القحطاني',
    project: 'الغربي',
    unit_number: 'C-7',
    complaint_source: 'بريد إلكتروني',
    status: 'cancelled',
    request_number: 'REQ-7892',
    complaint_description: 'ضعف في إشارة الإنترنت',
    maintenance_action: 'تواصل مع مزود خدمة الإنترنت',
    action_taken: 'تم إلغاء الطلب بناءً على طلب العميل',
    complaint_duration: '1 يوم',
    expected_resolution_time: '2025-01-14',
    created_at: '2025-01-13T15:20:00Z',
    updated_at: '2025-01-14T10:30:00Z',
    updated_by: 'nawaf'
  }
];

const ComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>(mockComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  
  const [newComplaint, setNewComplaint] = useState<Partial<Complaint>>({
    priority: 'medium',
    date: new Date().toISOString().split('T')[0],
    customer: '',
    project: '',
    unit_number: '',
    complaint_source: 'هاتف',
    status: 'pending',
    request_number: '',
    complaint_description: '',
    maintenance_action: '',
    action_taken: '',
    complaint_duration: '',
    expected_resolution_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    // Filter complaints based on search term and status
    let filtered = complaints;
    
    if (searchTerm) {
      filtered = filtered.filter(
        complaint =>
          complaint.customer.includes(searchTerm) ||
          complaint.ticket_number.includes(searchTerm) ||
          complaint.project.includes(searchTerm) ||
          complaint.unit_number.includes(searchTerm) ||
          complaint.complaint_description.includes(searchTerm)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }
    
    setFilteredComplaints(filtered);
  }, [complaints, searchTerm, statusFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleAddComplaint = () => {
    // Reset form and open modal
    setNewComplaint({
      priority: 'medium',
      date: new Date().toISOString().split('T')[0],
      customer: '',
      project: '',
      unit_number: '',
      complaint_source: 'هاتف',
      status: 'pending',
      request_number: '',
      complaint_description: '',
      maintenance_action: '',
      action_taken: '',
      complaint_duration: '',
      expected_resolution_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedComplaint) {
      // Update existing complaint
      const updatedComplaints = complaints.map(complaint =>
        complaint.id === selectedComplaint.id
          ? {
              ...complaint,
              ...newComplaint,
              updated_at: new Date().toISOString(),
              updated_by: 'nawaf'
            }
          : complaint
      );
      
      setComplaints(updatedComplaints);
      toast.success('تم تحديث الشكوى بنجاح');
    } else {
      // Add new complaint
      const newTicketNumber = `TCKT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const complaintToAdd: Complaint = {
        id: String(complaints.length + 1),
        ticket_number: newTicketNumber,
        priority: newComplaint.priority as 'high' | 'medium' | 'low',
        date: newComplaint.date || new Date().toISOString().split('T')[0],
        customer: newComplaint.customer || '',
        project: newComplaint.project || '',
        unit_number: newComplaint.unit_number || '',
        complaint_source: newComplaint.complaint_source || 'هاتف',
        status: newComplaint.status as 'resolved' | 'pending' | 'cancelled',
        request_number: newComplaint.request_number || `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        complaint_description: newComplaint.complaint_description || '',
        maintenance_action: newComplaint.maintenance_action || '',
        action_taken: newComplaint.action_taken || '',
        complaint_duration: newComplaint.complaint_duration || '',
        expected_resolution_time: newComplaint.expected_resolution_time || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: 'nawaf'
      };
      
      setComplaints([...complaints, complaintToAdd]);
      toast.success('تم إضافة الشكوى بنجاح');
    }
    
    setIsModalOpen(false);
  };

  const handleView = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewComplaint({ ...complaint });
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewComplaint({ ...complaint });
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه الشكوى؟')) {
      setComplaints(complaints.filter(complaint => complaint.id !== id));
      toast.success('تم حذف الشكوى بنجاح');
    }
  };

  const columns = [
    {
      header: 'الرقم التسلسلي',
      accessor: 'ticket_number'
    },
    {
      header: 'التاريخ',
      accessor: 'date'
    },
    {
      header: 'العميل',
      accessor: 'customer'
    },
    {
      header: 'المشروع',
      accessor: 'project'
    },
    {
      header: 'الوحدة',
      accessor: 'unit_number'
    },
    {
      header: 'الحالة',
      accessor: 'status',
      cell: (row: Complaint) => {
        let statusClass = '';
        let statusText = '';
        
        switch (row.status) {
          case 'resolved':
            statusClass = 'status-badge-resolved';
            statusText = 'تم الحل';
            break;
          case 'pending':
            statusClass = 'status-badge-pending';
            statusText = 'قيد المعالجة';
            break;
          case 'cancelled':
            statusClass = 'status-badge-cancelled';
            statusText = 'تم الإلغاء';
            break;
        }
        
        return <span className={`status-badge ${statusClass}`}>{statusText}</span>;
      }
    },
    {
      header: 'الإجراءات',
      accessor: (row: Complaint) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="عرض التفاصيل"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="p-1 text-yellow-400 hover:text-yellow-300"
            title="تعديل"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="p-1 text-red-400 hover:text-red-300"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الشكاوى</h1>
        <button
          onClick={handleAddComplaint}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle size={18} className="ml-2" />
          إضافة شكوى
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="بحث عن شكوى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 bg-slate-700 border border-slate-600 rounded-md text-white"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-slate-400" />
          </div>
          
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="resolved">تم الحل</option>
              <option value="pending">قيد المعالجة</option>
              <option value="cancelled">تم الإلغاء</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredComplaints}
          keyField="id"
        />
      </div>

      {/* Modal for adding/editing complaints */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isViewMode
                ? `عرض تفاصيل الشكوى: ${selectedComplaint?.ticket_number}`
                : selectedComplaint
                ? `تعديل الشكوى: ${selectedComplaint.ticket_number}`
                : 'إضافة شكوى جديدة'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">الأولوية</label>
                  <select
                    name="priority"
                    value={newComplaint.priority}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  >
                    <option value="high">عالية</option>
                    <option value="medium">متوسطة</option>
                    <option value="low">منخفضة</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">التاريخ</label>
                  <input
                    type="date"
                    name="date"
                    value={newComplaint.date}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">العميل</label>
                  <input
                    type="text"
                    name="customer"
                    value={newComplaint.customer}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">المشروع</label>
                  <input
                    type="text"
                    name="project"
                    value={newComplaint.project}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">رقم الوحدة / العمارة</label>
                  <input
                    type="text"
                    name="unit_number"
                    value={newComplaint.unit_number}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">مصدر الشكوى</label>
                  <select
                    name="complaint_source"
                    value={newComplaint.complaint_source}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  >
                    <option value="هاتف">هاتف</option>
                    <option value="بريد إلكتروني">بريد إلكتروني</option>
                    <option value="زيارة">زيارة</option>
                    <option value="تطبيق">تطبيق</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">الحالة</label>
                  <select
                    name="status"
                    value={newComplaint.status}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                    required
                  >
                    <option value="pending">قيد المعالجة</option>
                    <option value="resolved">تم الحل</option>
                    <option value="cancelled">تم الإلغاء</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">رقم الطلب</label>
                  <input
                    type="text"
                    name="request_number"
                    value={newComplaint.request_number}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                  />
                </div>
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">الشكوى</label>
                <textarea
                  name="complaint_description"
                  value={newComplaint.complaint_description}
                  onChange={handleInputChange}
                  className="form-input h-24"
                  disabled={isViewMode}
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">إجراء الصيانة والتسليم</label>
                  <input
                    type="text"
                    name="maintenance_action"
                    value={newComplaint.maintenance_action}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">الإجراء</label>
                  <input
                    type="text"
                    name="action_taken"
                    value={newComplaint.action_taken}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">مدة الشكوى</label>
                  <input
                    type="text"
                    name="complaint_duration"
                    value={newComplaint.complaint_duration}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="مثال: 3 أيام"
                    disabled={isViewMode}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">الوقت المتوقع لإغلاق الشكوى</label>
                  <input
                    type="date"
                    name="expected_resolution_time"
                    value={newComplaint.expected_resolution_time}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isViewMode}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  إلغاء
                </button>
                
                {!isViewMode && (
                  <button type="submit" className="btn btn-primary">
                    {selectedComplaint ? 'تحديث الشكوى' : 'إضافة شكوى'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;