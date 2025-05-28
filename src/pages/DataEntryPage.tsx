import React, { useState, useEffect } from 'react';
import TimeFrameToggle from '../components/TimeFrameToggle';
import { TimeFrame } from '../types';
import toast from 'react-hot-toast';

// Mock data - to be replaced with API calls
const mockInitialData = {
  weekly: {
    kpis: {
      referral_new_customers: 68,
      referral_after_year: 70,
      referral_old_customers: 35,
      delivery_quality: 99,
      maintenance_quality: 98,
      response_seconds: 2.5,
      call_response_rate: 16,
      customer_satisfaction: 78,
      maintenance_closing_speed: 2.2,
      ticket_reopening_count: 2,
      facility_management_quality: 85,
      conversion_rate: 2.5,
      delivery_satisfaction: 85,
      referred_customers_count: 583,
      sales_contribution: 7
    },
    customer_service: {
      complaints: 28,
      contact_requests: 42,
      maintenance_requests: 65,
      inquiries: 58,
      office_interests: 34,
      project_interests: 38,
      customer_interests: 42
    },
    inquiries: {
      general_inquiries: 20,
      document_requests: 10,
      deed_inquiries: 8,
      apartment_rentals: 12,
      sold_projects: 8
    },
    maintenance: {
      cancelled: 1,
      resolved: 0,
      in_progress: 9
    },
    satisfaction: {
      service_satisfaction: 87.4,
      first_time_resolution: 62.4,
      resolution_time_satisfaction: 80.9,
      customer_note: ''
    }
  },
  yearly: {
    kpis: {
      referral_new_customers: 66,
      referral_after_year: 67,
      referral_old_customers: 32,
      delivery_quality: 97,
      maintenance_quality: 95,
      response_seconds: 3.2,
      call_response_rate: 75,
      customer_satisfaction: 72,
      maintenance_closing_speed: 3.5,
      ticket_reopening_count: 1,
      facility_management_quality: 82,
      conversion_rate: 1.8,
      delivery_satisfaction: 81,
      referred_customers_count: 7004,
      sales_contribution: 4.8
    },
    customer_service: {
      complaints: 348,
      contact_requests: 512,
      maintenance_requests: 723,
      inquiries: 634,
      office_interests: 412,
      project_interests: 456,
      customer_interests: 534
    },
    inquiries: {
      general_inquiries: 210,
      document_requests: 145,
      deed_inquiries: 98,
      apartment_rentals: 132,
      sold_projects: 112
    },
    maintenance: {
      cancelled: 12,
      resolved: 87,
      in_progress: 24
    },
    satisfaction: {
      service_satisfaction: 84.2,
      first_time_resolution: 58.7,
      resolution_time_satisfaction: 76.3,
      customer_note: ''
    }
  }
};

const DataEntryPage: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('yearly');
  const [activeTab, setActiveTab] = useState('kpis');
  const [formData, setFormData] = useState(mockInitialData.yearly);

  useEffect(() => {
    // Update form data when timeFrame changes
    setFormData(timeFrame === 'weekly' ? mockInitialData.weekly : mockInitialData.yearly);
  }, [timeFrame]);

  const handleKpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      kpis: {
        ...formData.kpis,
        [name]: parseFloat(value) || 0
      }
    });
  };

  const handleCustomerServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      customer_service: {
        ...formData.customer_service,
        [name]: parseInt(value) || 0
      }
    });
  };

  const handleInquiriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      inquiries: {
        ...formData.inquiries,
        [name]: parseInt(value) || 0
      }
    });
  };

  const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      maintenance: {
        ...formData.maintenance,
        [name]: parseInt(value) || 0
      }
    });
  };

  const handleSatisfactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      satisfaction: {
        ...formData.satisfaction,
        [name]: name === 'customer_note' ? value : parseFloat(value) || 0
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would send the data to the API
    console.log('Saving data:', { timeFrame, formData });
    toast.success('تم حفظ البيانات بنجاح');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدخال البيانات</h1>
        <TimeFrameToggle timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <div className="flex border-b border-slate-700 mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === 'kpis'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('kpis')}
          >
            مؤشرات الأداء
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'customer_service'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('customer_service')}
          >
            خدمة العملاء
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'satisfaction'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('satisfaction')}
          >
            رضا العملاء
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'kpis' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <h2 className="text-xl font-bold col-span-full mb-4">مؤشرات الأداء الرئيسية - {timeFrame === 'weekly' ? 'أسبوعي' : 'سنوي'}</h2>
              
              <div className="form-group">
                <label className="form-label">نسبة الترشيح للعملاء الجدد</label>
                <input
                  type="number"
                  name="referral_new_customers"
                  value={formData.kpis.referral_new_customers}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">نسبة الترشيح بعد السنة</label>
                <input
                  type="number"
                  name="referral_after_year"
                  value={formData.kpis.referral_after_year}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">نسبة الترشيح للعملاء القدامى</label>
                <input
                  type="number"
                  name="referral_old_customers"
                  value={formData.kpis.referral_old_customers}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">جودة التسليم</label>
                <input
                  type="number"
                  name="delivery_quality"
                  value={formData.kpis.delivery_quality}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">جودة الصيانة</label>
                <input
                  type="number"
                  name="maintenance_quality"
                  value={formData.kpis.maintenance_quality}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">عدد الثواني للرد</label>
                <input
                  type="number"
                  name="response_seconds"
                  value={formData.kpis.response_seconds}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">معدل الرد على المكالمات</label>
                <input
                  type="number"
                  name="call_response_rate"
                  value={formData.kpis.call_response_rate}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">راحة العميل (CSAT)</label>
                <input
                  type="number"
                  name="customer_satisfaction"
                  value={formData.kpis.customer_satisfaction}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">سرعة إغلاق طلبات الصيانة</label>
                <input
                  type="number"
                  name="maintenance_closing_speed"
                  value={formData.kpis.maintenance_closing_speed}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">عدد إعادة فتح طلب</label>
                <input
                  type="number"
                  name="ticket_reopening_count"
                  value={formData.kpis.ticket_reopening_count}
                  onChange={handleKpiChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">جودة إدارة المرافق</label>
                <input
                  type="number"
                  name="facility_management_quality"
                  value={formData.kpis.facility_management_quality}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">معدل التحول</label>
                <input
                  type="number"
                  name="conversion_rate"
                  value={formData.kpis.conversion_rate}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">نسبة الرضا عن التسليم</label>
                <input
                  type="number"
                  name="delivery_satisfaction"
                  value={formData.kpis.delivery_satisfaction}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">عدد العملاء المرشحين</label>
                <input
                  type="number"
                  name="referred_customers_count"
                  value={formData.kpis.referred_customers_count}
                  onChange={handleKpiChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">المساهمة في المبيعات</label>
                <input
                  type="number"
                  name="sales_contribution"
                  value={formData.kpis.sales_contribution}
                  onChange={handleKpiChange}
                  className="form-input"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {activeTab === 'customer_service' && (
            <div>
              <h2 className="text-xl font-bold mb-4">خدمة العملاء - {timeFrame === 'weekly' ? 'أسبوعي' : 'سنوي'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="form-group">
                  <label className="form-label">شكاوى</label>
                  <input
                    type="number"
                    name="complaints"
                    value={formData.customer_service.complaints}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">طلبات تواصل</label>
                  <input
                    type="number"
                    name="contact_requests"
                    value={formData.customer_service.contact_requests}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">طلبات صيانة</label>
                  <input
                    type="number"
                    name="maintenance_requests"
                    value={formData.customer_service.maintenance_requests}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">استفسارات</label>
                  <input
                    type="number"
                    name="inquiries"
                    value={formData.customer_service.inquiries}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">مهتمين مكاتب</label>
                  <input
                    type="number"
                    name="office_interests"
                    value={formData.customer_service.office_interests}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">مهتمين مشاريع</label>
                  <input
                    type="number"
                    name="project_interests"
                    value={formData.customer_service.project_interests}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">عملاء مهتمين</label>
                  <input
                    type="number"
                    name="customer_interests"
                    value={formData.customer_service.customer_interests}
                    onChange={handleCustomerServiceChange}
                    className="form-input"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">الاستفسارات</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="form-group">
                  <label className="form-label">استفسارات عامة</label>
                  <input
                    type="number"
                    name="general_inquiries"
                    value={formData.inquiries.general_inquiries}
                    onChange={handleInquiriesChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">طلب أوراق</label>
                  <input
                    type="number"
                    name="document_requests"
                    value={formData.inquiries.document_requests}
                    onChange={handleInquiriesChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">استفسارات الصكوك</label>
                  <input
                    type="number"
                    name="deed_inquiries"
                    value={formData.inquiries.deed_inquiries}
                    onChange={handleInquiriesChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">إيجارات شقق</label>
                  <input
                    type="number"
                    name="apartment_rentals"
                    value={formData.inquiries.apartment_rentals}
                    onChange={handleInquiriesChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">مشاريع مباعة</label>
                  <input
                    type="number"
                    name="sold_projects"
                    value={formData.inquiries.sold_projects}
                    onChange={handleInquiriesChange}
                    className="form-input"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">حالة طلبات الصيانة</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">تم الإلغاء</label>
                  <input
                    type="number"
                    name="cancelled"
                    value={formData.maintenance.cancelled}
                    onChange={handleMaintenanceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">تم الحل</label>
                  <input
                    type="number"
                    name="resolved"
                    value={formData.maintenance.resolved}
                    onChange={handleMaintenanceChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">قيد المعالجة</label>
                  <input
                    type="number"
                    name="in_progress"
                    value={formData.maintenance.in_progress}
                    onChange={handleMaintenanceChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'satisfaction' && (
            <div>
              <h2 className="text-xl font-bold mb-4">رضا العملاء - {timeFrame === 'weekly' ? 'أسبوعي' : 'سنوي'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="form-group">
                  <label className="form-label">رضا العملاء عن الخدمات</label>
                  <input
                    type="number"
                    name="service_satisfaction"
                    value={formData.satisfaction.service_satisfaction}
                    onChange={handleSatisfactionChange}
                    className="form-input"
                    step="0.1"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">نسبة الحل من أول مرة</label>
                  <input
                    type="number"
                    name="first_time_resolution"
                    value={formData.satisfaction.first_time_resolution}
                    onChange={handleSatisfactionChange}
                    className="form-input"
                    step="0.1"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">رضا العملاء عن مدة الإغلاق</label>
                  <input
                    type="number"
                    name="resolution_time_satisfaction"
                    value={formData.satisfaction.resolution_time_satisfaction}
                    onChange={handleSatisfactionChange}
                    className="form-input"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">ملاحظة عميل جديدة</label>
                <textarea
                  name="customer_note"
                  value={formData.satisfaction.customer_note}
                  onChange={handleSatisfactionChange}
                  className="form-input h-32"
                  placeholder="أدخل ملاحظة العميل هنا..."
                ></textarea>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button type="submit" className="btn btn-primary">
              حفظ البيانات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntryPage;