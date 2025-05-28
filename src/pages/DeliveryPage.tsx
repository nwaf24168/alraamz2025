import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Delivery } from '../types';
import { PlusCircle, Download, Upload, Trash2, Edit, Eye, Search } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - to be replaced with API calls
const mockDeliveries: Delivery[] = [
  {
    id: '1',
    reservation_id: '1',
    customer_name: 'تركي السعيد',
    customer_number: '05xxxxxxxx',
    project: 'الشمالي',
    building: 'A',
    unit: '26',
    payment_method: 'نقدي',
    is_offplan: false,
    unit_value: 750000,
    transfer_date: '2024-12-17',
    sales_employee: 'فهد الحربي',
    construction_end_date: '2024-11-30',
    final_receipt_date: '2024-12-10',
    electricity_transfer_date: '2024-12-12',
    water_transfer_date: '2024-12-13',
    customer_delivery_date: '2024-12-20',
    notes: 'تم التسليم بنجاح',
    is_evaluated: true,
    evaluation_percentage: 95,
    status: 'complete',
    created_at: '2024-12-01T08:30:00Z',
    updated_at: '2024-12-20T14:15:00Z'
  },
  {
    id: '4',
    reservation_id: '4',
    customer_name: 'تركي السماري',
    customer_number: '05xxxxxxxx',
    project: 'الشمالي',
    building: 'A',
    unit: '42',
    payment_method: 'تمويل بنكي',
    is_offplan: true,
    unit_value: 850000,
    transfer_date: '2024-12-25',
    sales_employee: 'سعد العتيبي',
    construction_end_date: '2024-12-15',
    final_receipt_date: '2024-12-20',
    electricity_transfer_date: '2024-12-22',
    water_transfer_date: '2024-12-23',
    customer_delivery_date: '',
    notes: '',
    is_evaluated: false,
    evaluation_percentage: 0,
    status: 'waiting_customer_satisfaction',
    created_at: '2024-11-10T10:45:00Z',
    updated_at: '2024-12-23T09:30:00Z'
  },
  {
    id: '5',
    reservation_id: '5',
    customer_name: 'علي بخاري',
    customer_number: '05xxxxxxxx',
    project: 'زهرة 45',
    building: 'B',
    unit: '3',
    payment_method: 'نقدي',
    is_offplan: true,
    unit_value: 620000,
    transfer_date: '2024-12-01',
    sales_employee: 'خالد الزهراني',
    construction_end_date: '',
    final_receipt_date: '',
    electricity_transfer_date: '',
    water_transfer_date: '',
    customer_delivery_date: '',
    notes: 'في مرحلة البناء',
    is_evaluated: false,
    evaluation_percentage: 0,
    status: 'waiting_projects',
    created_at: '2024-10-15T11:20:00Z',
    updated_at: '2024-12-01T15:10:00Z'
  },
  {
    id: '6',
    reservation_id: '6',
    customer_name: 'ياسين العلي',
    customer_number: '05xxxxxxxx',
    project: 'زهرة 45',
    building: 'C',
    unit: '14',
    payment_method: 'تمويل بنكي',
    is_offplan: true,
    unit_value: 580000,
    transfer_date: '2024-12-18',
    sales_employee: 'محمد السالم',
    construction_end_date: '',
    final_receipt_date: '',
    electricity_transfer_date: '',
    water_transfer_date: '',
    customer_delivery_date: '',
    notes: 'في مرحلة البناء',
    is_evaluated: false,
    evaluation_percentage: 0,
    status: 'waiting_projects',
    created_at: '2024-10-20T09:15:00Z',
    updated_at: '2024-12-18T13:40:00Z'
  }
];

const DeliveryPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  
  const [newDelivery, setNewDelivery] = useState<Partial<Delivery>>({
    customer_name: '',
    customer_number: '',
    project: '',
    building: '',
    unit: '',
    payment_method: 'نقدي',
    is_offplan: false,
    unit_value: 0,
    transfer_date: new Date().toISOString().split('T')[0],
    sales_employee: '',
    status: 'incomplete'
  });

  useEffect(() => {
    // Filter deliveries based on search term and status
    let filtered = deliveries;
    
    if (searchTerm) {
      filtered = filtered.filter(
        delivery =>
          delivery.customer_name.includes(searchTerm) ||
          delivery.project.includes(searchTerm) ||
          delivery.building.includes(searchTerm) ||
          delivery.unit.includes(searchTerm)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(delivery => delivery.status === statusFilter);
    }
    
    setFilteredDeliveries(filtered);
  }, [deliveries, searchTerm, statusFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkboxTarget = e.target as HTMLInputElement;
      setNewDelivery(prev => ({ ...prev, [name]: checkboxTarget.checked }));
    } else if (type === 'number') {
      setNewDelivery(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewDelivery(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddDelivery = () => {
    // Reset form and open modal
    setNewDelivery({
      customer_name: '',
      customer_number: '',
      project: '',
      building: '',
      unit: '',
      payment_method: 'نقدي',
      is_offplan: false,
      unit_value: 0,
      transfer_date: new Date().toISOString().split('T')[0],
      sales_employee: '',
      status: 'incomplete'
    });
    setActiveStep(1);
    setIsViewMode(false);
    setSelectedDelivery(null);
    setIsModalOpen(true);
  };

  const handleView = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setNewDelivery({ ...delivery });
    setIsViewMode(true);
    
    // Set active step based on status
    if (delivery.status === 'incomplete') {
      setActiveStep(1);
    } else if (delivery.status === 'waiting_projects') {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
    
    setIsModalOpen(true);
  };

  const handleEdit = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setNewDelivery({ ...delivery });
    setIsViewMode(false);
    
    // Set active step based on status
    if (delivery.status === 'incomplete') {
      setActiveStep(1);
    } else if (delivery.status === 'waiting_projects') {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الحجز؟')) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
      toast.success('تم حذف الحجز بنجاح');
    }
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      // Update status to waiting_projects
      setNewDelivery(prev => ({ ...prev, status: 'waiting_projects' }));
    } else if (activeStep === 2) {
      // Update status to waiting_customer_satisfaction
      setNewDelivery(prev => ({ ...prev, status: 'waiting_customer_satisfaction' }));
    } else if (activeStep === 3) {
      // Update status to complete
      setNewDelivery(prev => ({ ...prev, status: 'complete' }));
    }
    
    setActiveStep(prevStep => Math.min(prevStep + 1, 3));
  };

  const handlePrevStep = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timestamp = new Date().toISOString();
    
    if (selectedDelivery) {
      // Update existing delivery
      const updatedDeliveries = deliveries.map(delivery =>
        delivery.id === selectedDelivery.id
          ? {
              ...delivery,
              ...newDelivery,
              updated_at: timestamp
            }
          : delivery
      );
      
      setDeliveries(updatedDeliveries);
      toast.success('تم تحديث بيانات الحجز بنجاح');
    } else {
      // Add new delivery
      const deliveryToAdd: Delivery = {
        id: String(deliveries.length + 1),
        reservation_id: String(deliveries.length + 1),
        customer_name: newDelivery.customer_name || '',
        customer_number: newDelivery.customer_number || '',
        project: newDelivery.project || '',
        building: newDelivery.building || '',
        unit: newDelivery.unit || '',
        payment_method: newDelivery.payment_method || 'نقدي',
        is_offplan: newDelivery.is_offplan || false,
        unit_value: newDelivery.unit_value || 0,
        transfer_date: newDelivery.transfer_date || timestamp.split('T')[0],
        sales_employee: newDelivery.sales_employee || '',
        construction_end_date: newDelivery.construction_end_date || '',
        final_receipt_date: newDelivery.final_receipt_date || '',
        electricity_transfer_date: newDelivery.electricity_transfer_date || '',
        water_transfer_date: newDelivery.water_transfer_date || '',
        customer_delivery_date: newDelivery.customer_delivery_date || '',
        notes: newDelivery.notes || '',
        is_evaluated: newDelivery.is_evaluated || false,
        evaluation_percentage: newDelivery.evaluation_percentage || 0,
        status: newDelivery.status as 'incomplete' | 'waiting_projects' | 'waiting_customer_satisfaction' | 'complete',
        created_at: timestamp,
        updated_at: timestamp
      };
      
      setDeliveries([...deliveries, deliveryToAdd]);
      toast.success('تم إضافة الحجز بنجاح');
    }
    
    setIsModalOpen(false);
  };

  const handleImportExcel = () => {
    // Placeholder for Excel import functionality
    toast.success('تم استيراد البيانات من ملف Excel بنجاح');
  };

  const handleExportExcel = () => {
    // Placeholder for Excel export functionality
    toast.success('تم تصدير البيانات إلى ملف Excel بنجاح');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'incomplete':
        return 'لم يكتمل';
      case 'waiting_projects':
        return 'بانتظار إدارة المشاريع';
      case 'waiting_customer_satisfaction':
        return 'بانتظار إدارة راحة العملاء';
      case 'complete':
        return 'مكتمل من كل الإدارات';
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'incomplete':
        return 'bg-red-900/50 text-red-400 border border-red-500';
      case 'waiting_projects':
        return 'bg-yellow-900/50 text-yellow-400 border border-yellow-500';
      case 'waiting_customer_satisfaction':
        return 'bg-yellow-900/50 text-yellow-400 border border-yellow-500';
      case 'complete':
        return 'bg-green-900/50 text-green-400 border border-green-500';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const columns = [
    {
      header: 'الرقم التسلسلي',
      accessor: 'reservation_id'
    },
    {
      header: 'تاريخ الحجز',
      accessor: 'transfer_date'
    },
    {
      header: 'اسم العميل',
      accessor: 'customer_name'
    },
    {
      header: 'المشروع',
      accessor: 'project'
    },
    {
      header: 'الوحدة',
      accessor: 'unit'
    },
    {
      header: 'حالة الحجز',
      accessor: 'status',
      cell: (row: Delivery) => (
        <span className={`status-badge ${getStatusClass(row.status)}`}>
          {getStatusLabel(row.status)}
        </span>
      )
    },
    {
      header: 'الإجراءات',
      accessor: (row: Delivery) => (
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
            <Edit size={18} />
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
        <h1 className="text-2xl font-bold">قسم الحجز</h1>
        <div className="flex gap-2">
          <button
            onClick={handleImportExcel}
            className="btn btn-secondary flex items-center"
          >
            <Download size={18} className="ml-2" />
            استيراد من إكسل
          </button>
          <button
            onClick={handleExportExcel}
            className="btn btn-secondary flex items-center"
          >
            <Upload size={18} className="ml-2" />
            تصدير إلى إكسل
          </button>
          <button
            onClick={handleAddDelivery}
            className="btn btn-primary flex items-center"
          >
            <PlusCircle size={18} className="ml-2" />
            إضافة حجز جديد
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">سجل الحجز</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="بحث عن حجز..."
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
              <option value="incomplete">لم يكتمل</option>
              <option value="waiting_projects">بانتظار إدارة المشاريع</option>
              <option value="waiting_customer_satisfaction">بانتظار إدارة راحة العملاء</option>
              <option value="complete">مكتمل من كل الإدارات</option>
            </select>
          </div>
        </div>
        
        <div className="flex overflow-x-auto mb-4">
          <select
            value="all"
            onChange={() => {}}
            className="p-2 bg-slate-700 border border-slate-600 rounded-md text-white ml-2"
          >
            <option value="all">الكل</option>
            <option value="month">الشهر</option>
            <option value="year">السنة</option>
          </select>
          
          <select
            value="all"
            onChange={() => {}}
            className="p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
          >
            <option value="all">الكل</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={filteredDeliveries}
          keyField="id"
        />
      </div>

      {/* Modal for adding/editing deliveries */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isViewMode
                ? `عرض تفاصيل الحجز: ${selectedDelivery?.reservation_id}`
                : selectedDelivery
                ? `تعديل الحجز: ${selectedDelivery.reservation_id}`
                : 'إضافة حجز جديد'}
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">المراحل</h3>
                {!isViewMode && (
                  <div className="text-sm text-slate-400">
                    الرجاء إكمال المرحلة الحالية للانتقال للمرحلة التالية
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= 1 ? 'bg-blue-600' : 'bg-slate-700'
                }`}>
                  1
                </div>
                <div className={`h-1 flex-1 ${
                  activeStep >= 2 ? 'bg-blue-600' : 'bg-slate-700'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= 2 ? 'bg-blue-600' : 'bg-slate-700'
                }`}>
                  2
                </div>
                <div className={`h-1 flex-1 ${
                  activeStep >= 3 ? 'bg-blue-600' : 'bg-slate-700'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= 3 ? 'bg-blue-600' : 'bg-slate-700'
                }`}>
                  3
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-slate-400">
                <div className="text-center w-1/3">إدارة المبيعات</div>
                <div className="text-center w-1/3">إدارة المشاريع</div>
                <div className="text-center w-1/3">إدارة راحة العملاء</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Sales Department */}
              {activeStep === 1 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">
                    مرحلة 1 - إدارة المبيعات
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="form-label">تاريخ الحجز</label>
                      <input
                        type="date"
                        name="transfer_date"
                        value={newDelivery.transfer_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">اسم العميل</label>
                      <input
                        type="text"
                        name="customer_name"
                        value={newDelivery.customer_name || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">رقم العميل</label>
                      <input
                        type="text"
                        name="customer_number"
                        value={newDelivery.customer_number || ''}
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
                        value={newDelivery.project || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">العمارة</label>
                      <input
                        type="text"
                        name="building"
                        value={newDelivery.building || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">الوحدة</label>
                      <input
                        type="text"
                        name="unit"
                        value={newDelivery.unit || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">طريقة الدفع</label>
                      <select
                        name="payment_method"
                        value={newDelivery.payment_method || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      >
                        <option value="نقدي">نقدي</option>
                        <option value="تمويل بنكي">تمويل بنكي</option>
                        <option value="تقسيط">تقسيط</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">نوع البيع</label>
                      <div className="mt-2">
                        <label className="inline-flex items-center ml-4">
                          <input
                            type="checkbox"
                            name="is_offplan"
                            checked={newDelivery.is_offplan || false}
                            onChange={(e) => setNewDelivery(prev => ({ ...prev, is_offplan: e.target.checked }))}
                            className="form-checkbox h-5 w-5 text-blue-600"
                            disabled={isViewMode}
                          />
                          <span className="mr-2">بيع على الخارطة</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="is_ready"
                            checked={!newDelivery.is_offplan}
                            onChange={(e) => setNewDelivery(prev => ({ ...prev, is_offplan: !e.target.checked }))}
                            className="form-checkbox h-5 w-5 text-blue-600"
                            disabled={isViewMode}
                          />
                          <span className="mr-2">جاهز</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">قيمة الوحدة</label>
                      <input
                        type="number"
                        name="unit_value"
                        value={newDelivery.unit_value || 0}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">تاريخ الإفراغ</label>
                      <input
                        type="date"
                        name="transfer_date"
                        value={newDelivery.transfer_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">اسم موظف المبيعات</label>
                      <input
                        type="text"
                        name="sales_employee"
                        value={newDelivery.sales_employee || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Projects Department */}
              {activeStep === 2 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">
                    مرحلة 2 - إدارة المشاريع
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="form-label">تاريخ انتهاء أعمال البناء</label>
                      <input
                        type="date"
                        name="construction_end_date"
                        value={newDelivery.construction_end_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required={activeStep === 2}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">تاريخ الاستلام النهائي</label>
                      <input
                        type="date"
                        name="final_receipt_date"
                        value={newDelivery.final_receipt_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required={activeStep === 2}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">تاريخ نقل عداد الكهرباء</label>
                      <input
                        type="date"
                        name="electricity_transfer_date"
                        value={newDelivery.electricity_transfer_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required={activeStep === 2}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">تاريخ نقل عداد الماء</label>
                      <input
                        type="date"
                        name="water_transfer_date"
                        value={newDelivery.water_transfer_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required={activeStep === 2}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">تاريخ التسليم للعميل</label>
                      <input
                        type="date"
                        name="customer_delivery_date"
                        value={newDelivery.customer_delivery_date || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isViewMode}
                        required={activeStep === 2}
                      />
                    </div>
                    
                    <div className="form-group md:col-span-2">
                      <label className="form-label">ملاحظات</label>
                      <textarea
                        name="notes"
                        value={newDelivery.notes || ''}
                        onChange={handleInputChange}
                        className="form-input h-24"
                        disabled={isViewMode}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Customer Satisfaction Department */}
              {activeStep === 3 && (
                <div>
                  <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">
                    مرحلة 3 - إدارة راحة العملاء
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="form-label">هل تم تقييم الاستلام؟</label>
                      <div className="mt-2">
                        <label className="inline-flex items-center ml-4">
                          <input
                            type="radio"
                            name="is_evaluated"
                            checked={newDelivery.is_evaluated === true}
                            onChange={() => setNewDelivery(prev => ({ ...prev, is_evaluated: true }))}
                            className="form-radio h-5 w-5 text-blue-600"
                            disabled={isViewMode}
                          />
                          <span className="mr-2">نعم</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="is_evaluated"
                            checked={newDelivery.is_evaluated === false}
                            onChange={() => setNewDelivery(prev => ({ ...prev, is_evaluated: false }))}
                            className="form-radio h-5 w-5 text-blue-600"
                            disabled={isViewMode}
                          />
                          <span className="mr-2">لا</span>
                        </label>
                      </div>
                    </div>
                    
                    {newDelivery.is_evaluated && (
                      <div className="form-group">
                        <label className="form-label">نسبة التقييم</label>
                        <input
                          type="number"
                          name="evaluation_percentage"
                          value={newDelivery.evaluation_percentage || 0}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          className="form-input"
                          disabled={isViewMode}
                          required={newDelivery.is_evaluated}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                {activeStep > 1 && !isViewMode && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-secondary"
                  >
                    المرحلة السابقة
                  </button>
                )}
                
                {activeStep === 1 && !isViewMode && (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    إلغاء
                  </button>
                )}
                
                <div className="flex gap-2 mr-auto">
                  {isViewMode ? (
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn btn-primary"
                    >
                      إغلاق
                    </button>
                  ) : (
                    <>
                      {activeStep < 3 && (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="btn btn-primary"
                        >
                          المرحلة التالية
                        </button>
                      )}
                      
                      <button type="submit" className="btn btn-success">
                        {selectedDelivery ? 'تحديث' : 'حفظ'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;