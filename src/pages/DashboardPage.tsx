import React, { useState, useEffect } from 'react';
import TimeFrameToggle from '../components/TimeFrameToggle';
import KPICard from '../components/KPICard';
import DataTable from '../components/DataTable';
import { TimeFrame } from '../types';
import { MessageCircle, SmilePlus, Frown } from 'lucide-react';

// Mock data - to be replaced with API calls
const mockKPIs = {
  weekly: [
    { id: '1', name: 'نسبة الترشيح للعملاء الجدد', value: 68, target: 65, change_percentage: 4.6, icon: 'users' },
    { id: '2', name: 'نسبة الترشيح بعد السنة', value: 70, target: 65, change_percentage: 7.7, icon: 'users' },
    { id: '3', name: 'نسبة الترشيح للعملاء القدامى', value: 35, target: 30, change_percentage: 16.7, icon: 'users' },
    { id: '4', name: 'جودة التسليم', value: 99, target: 100, change_percentage: 2.5, icon: 'check', unit: '%' },
    { id: '5', name: 'جودة الصيانة', value: 98, target: 100, change_percentage: 3.8, icon: 'check', unit: '%' },
    { id: '6', name: 'عدد الثواني للرد', value: 2.5, target: 3, change_percentage: 16.7, icon: 'time', unit: ' ثانية' },
    { id: '7', name: 'معدل الرد على المكالمات', value: 16, target: 80, change_percentage: 20.0, icon: 'phone', unit: '%' },
    { id: '8', name: 'راحة العميل (CSAT)', value: 78, target: 70, change_percentage: 11.4, icon: 'heart', unit: '%' },
    { id: '9', name: 'سرعة إغلاق طلبات الصيانة', value: 2.2, target: 3, change_percentage: 26.7, icon: 'time', unit: ' يوم' },
    { id: '10', name: 'عدد إعادة فتح طلب', value: 2, target: 0, change_percentage: 200.0, icon: 'refresh' },
    { id: '11', name: 'جودة إدارة المرافق', value: 85, target: 80, change_percentage: 6.3, icon: 'building', unit: '%' },
    { id: '12', name: 'معدل التحول', value: 2.5, target: 2, change_percentage: 25.0, icon: 'percent', unit: '%' },
    { id: '13', name: 'نسبة الرضا عن التسليم', value: 85, target: 80, change_percentage: 6.3, icon: 'heart', unit: '%' },
    { id: '14', name: 'عدد العملاء المرشحين', value: 583, target: 584, change_percentage: 91.7, icon: 'users' },
    { id: '15', name: 'المساهمة في المبيعات', value: 7, target: 5, change_percentage: 40.0, icon: 'percent', unit: '%' },
  ],
  yearly: [
    { id: '1', name: 'نسبة الترشيح للعملاء الجدد', value: 66, target: 65, change_percentage: 1.5, icon: 'users' },
    { id: '2', name: 'نسبة الترشيح بعد السنة', value: 67, target: 65, change_percentage: 3.1, icon: 'users' },
    { id: '3', name: 'نسبة الترشيح للعملاء القدامى', value: 32, target: 30, change_percentage: 6.7, icon: 'users' },
    { id: '4', name: 'جودة التسليم', value: 97, target: 100, change_percentage: -3.0, icon: 'check', unit: '%' },
    { id: '5', name: 'جودة الصيانة', value: 95, target: 100, change_percentage: -5.0, icon: 'check', unit: '%' },
    { id: '6', name: 'عدد الثواني للرد', value: 3.2, target: 3, change_percentage: 6.7, icon: 'time', unit: ' ثانية' },
    { id: '7', name: 'معدل الرد على المكالمات', value: 75, target: 80, change_percentage: -6.3, icon: 'phone', unit: '%' },
    { id: '8', name: 'راحة العميل (CSAT)', value: 72, target: 70, change_percentage: 2.9, icon: 'heart', unit: '%' },
    { id: '9', name: 'سرعة إغلاق طلبات الصيانة', value: 3.5, target: 3, change_percentage: 16.7, icon: 'time', unit: ' يوم' },
    { id: '10', name: 'عدد إعادة فتح طلب', value: 1, target: 0, change_percentage: 100.0, icon: 'refresh' },
    { id: '11', name: 'جودة إدارة المرافق', value: 82, target: 80, change_percentage: 2.5, icon: 'building', unit: '%' },
    { id: '12', name: 'معدل التحول', value: 1.8, target: 2, change_percentage: -10.0, icon: 'percent', unit: '%' },
    { id: '13', name: 'نسبة الرضا عن التسليم', value: 81, target: 80, change_percentage: 1.3, icon: 'heart', unit: '%' },
    { id: '14', name: 'عدد العملاء المرشحين', value: 7004, target: 7004, change_percentage: 0.0, icon: 'users' },
    { id: '15', name: 'المساهمة في المبيعات', value: 4.8, target: 5, change_percentage: -4.0, icon: 'percent', unit: '%' },
  ]
};

const mockCustomerService = {
  weekly: {
    calls: {
      complaints: 28,
      contact_requests: 42,
      maintenance_requests: 65,
      inquiries: 58,
      office_interests: 34,
      project_interests: 38,
      customer_interests: 42,
      total: 307
    },
    inquiries: {
      general_inquiries: 20,
      document_requests: 10,
      deed_inquiries: 8,
      apartment_rentals: 12,
      sold_projects: 8,
      total: 58
    },
    maintenance: {
      cancelled: 1,
      resolved: 0,
      in_progress: 9,
      total: 10
    }
  },
  yearly: {
    calls: {
      complaints: 348,
      contact_requests: 512,
      maintenance_requests: 723,
      inquiries: 634,
      office_interests: 412,
      project_interests: 456,
      customer_interests: 534,
      total: 3619
    },
    inquiries: {
      general_inquiries: 210,
      document_requests: 145,
      deed_inquiries: 98,
      apartment_rentals: 132,
      sold_projects: 112,
      total: 697
    },
    maintenance: {
      cancelled: 12,
      resolved: 87,
      in_progress: 24,
      total: 123
    }
  }
};

const mockCustomerSatisfaction = {
  weekly: {
    service_satisfaction: 87.4,
    first_time_resolution: 62.4,
    resolution_time_satisfaction: 80.9,
    notes: [
      { customer: 'عبدالله الحربي', text: 'خدمة ممتازة وسريعة', time: '12:30 PM' },
      { customer: 'سارة العتيبي', text: 'تأخر في معالجة المشكلة', time: '09:15 AM' },
      { customer: 'محمد القحطاني', text: 'فريق محترف جدًا', time: '02:45 PM' }
    ]
  },
  yearly: {
    service_satisfaction: 84.2,
    first_time_resolution: 58.7,
    resolution_time_satisfaction: 76.3,
    notes: [
      { customer: 'فهد السهلي', text: 'راضي عن مستوى الخدمة بشكل عام', time: '11:20 AM' },
      { customer: 'نورة الدوسري', text: 'أتمنى تحسين سرعة الاستجابة', time: '10:05 AM' },
      { customer: 'سلطان العنزي', text: 'تجربة إيجابية مع فريق الصيانة', time: '03:30 PM' }
    ]
  }
};

const DashboardPage: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('yearly');
  const [kpis, setKpis] = useState(mockKPIs.yearly);
  const [customerService, setCustomerService] = useState(mockCustomerService.yearly);
  const [satisfaction, setSatisfaction] = useState(mockCustomerSatisfaction.yearly);

  useEffect(() => {
    // Update data when timeFrame changes
    setKpis(timeFrame === 'weekly' ? mockKPIs.weekly : mockKPIs.yearly);
    setCustomerService(timeFrame === 'weekly' ? mockCustomerService.weekly : mockCustomerService.yearly);
    setSatisfaction(timeFrame === 'weekly' ? mockCustomerSatisfaction.weekly : mockCustomerSatisfaction.yearly);
  }, [timeFrame]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم الرئيسية</h1>
        <TimeFrameToggle timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>

      <h2 className="text-xl font-bold mb-4">مؤشرات الأداء الرئيسية {timeFrame === 'weekly' ? 'الأسبوعية' : 'السنوية'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {kpis.map(kpi => (
          <KPICard
            key={kpi.id}
            title={kpi.name}
            value={kpi.value}
            target={kpi.target}
            changePercentage={kpi.change_percentage}
            icon={kpi.icon}
            unit={kpi.unit}
          />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">خدمة العملاء {timeFrame === 'weekly' ? 'الأسبوعية' : 'السنوية'}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-center">المكالمات</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td>شكاوى</td>
                <td className="text-left">{customerService.calls.complaints}</td>
              </tr>
              <tr>
                <td>طلبات تواصل</td>
                <td className="text-left">{customerService.calls.contact_requests}</td>
              </tr>
              <tr>
                <td>طلبات صيانة</td>
                <td className="text-left">{customerService.calls.maintenance_requests}</td>
              </tr>
              <tr>
                <td>استفسارات</td>
                <td className="text-left">{customerService.calls.inquiries}</td>
              </tr>
              <tr>
                <td>مهتمين مكاتب</td>
                <td className="text-left">{customerService.calls.office_interests}</td>
              </tr>
              <tr>
                <td>مهتمين مشاريع</td>
                <td className="text-left">{customerService.calls.project_interests}</td>
              </tr>
              <tr>
                <td>عملاء مهتمين</td>
                <td className="text-left">{customerService.calls.customer_interests}</td>
              </tr>
              <tr className="font-bold">
                <td>إجمالي المكالمات</td>
                <td className="text-left">{customerService.calls.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-center">الاستفسارات</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td>استفسارات عامة</td>
                <td className="text-left">{customerService.inquiries.general_inquiries}</td>
              </tr>
              <tr>
                <td>طلب أوراق</td>
                <td className="text-left">{customerService.inquiries.document_requests}</td>
              </tr>
              <tr>
                <td>استفسارات الصكوك</td>
                <td className="text-left">{customerService.inquiries.deed_inquiries}</td>
              </tr>
              <tr>
                <td>إيجارات شقق</td>
                <td className="text-left">{customerService.inquiries.apartment_rentals}</td>
              </tr>
              <tr>
                <td>مشاريع مباعة</td>
                <td className="text-left">{customerService.inquiries.sold_projects}</td>
              </tr>
              <tr className="font-bold">
                <td>إجمالي الاستفسارات</td>
                <td className="text-left">{customerService.inquiries.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-center">حالة طلبات الصيانة</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td>تم الإلغاء</td>
                <td className="text-left">{customerService.maintenance.cancelled}</td>
              </tr>
              <tr>
                <td>تم الحل</td>
                <td className="text-left">{customerService.maintenance.resolved}</td>
              </tr>
              <tr>
                <td>قيد المعالجة</td>
                <td className="text-left">{customerService.maintenance.in_progress}</td>
              </tr>
              <tr className="font-bold">
                <td>إجمالي طلبات الصيانة</td>
                <td className="text-left">{customerService.maintenance.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">رضا العملاء عن الخدمات</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-l-4 border-yellow-500 rounded-lg p-6 flex flex-col items-center">
          <Frown size={48} className="text-yellow-400 mb-2" />
          <p className="text-3xl font-bold text-yellow-400">{satisfaction.first_time_resolution}%</p>
          <p className="text-center mt-2">نسبة الحل من أول مرة</p>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border-l-4 border-emerald-500 rounded-lg p-6 flex flex-col items-center">
          <SmilePlus size={48} className="text-emerald-400 mb-2" />
          <p className="text-3xl font-bold text-emerald-400">{satisfaction.resolution_time_satisfaction}%</p>
          <p className="text-center mt-2">رضا العملاء عن مدة الإغلاق</p>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border-l-4 border-emerald-500 rounded-lg p-6 flex flex-col items-center">
          <SmilePlus size={48} className="text-emerald-400 mb-2" />
          <p className="text-3xl font-bold text-emerald-400">{satisfaction.service_satisfaction}%</p>
          <p className="text-center mt-2">رضا العملاء عن الخدمات</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">ملاحظات العملاء</h2>
      
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          {satisfaction.notes.map((note, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-4 flex items-start">
              <MessageCircle size={20} className="text-blue-400 ml-3 mt-1" />
              <div>
                <div className="flex items-center">
                  <h4 className="font-bold">{note.customer}</h4>
                  <span className="text-xs text-slate-400 mr-2">{note.time}</span>
                </div>
                <p className="mt-1">{note.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;