import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import TimeFrameToggle from '../components/TimeFrameToggle';
import { TimeFrame } from '../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data - to be replaced with API calls
const mockData = {
  weekly: {
    kpis: {
      referral_new_customers: [62, 64, 65, 67, 68],
      referral_after_year: [64, 66, 68, 69, 70],
      referral_old_customers: [28, 30, 32, 34, 35],
      delivery_quality: [95, 96, 97, 98, 99],
      maintenance_quality: [94, 95, 96, 97, 98],
      response_seconds: [3.2, 3.0, 2.8, 2.6, 2.5],
      call_response_rate: [10, 12, 14, 15, 16],
      customer_satisfaction: [70, 72, 74, 76, 78],
      maintenance_closing_speed: [3.0, 2.8, 2.6, 2.4, 2.2],
      ticket_reopening_count: [4, 3, 3, 2, 2],
      facility_management_quality: [75, 78, 80, 83, 85],
      conversion_rate: [1.8, 2.0, 2.2, 2.3, 2.5],
      delivery_satisfaction: [75, 78, 80, 83, 85],
      referred_customers_count: [520, 540, 560, 570, 583],
      sales_contribution: [4, 5, 6, 6, 7],
    },
    delivery: {
      units_sold_monthly: [8, 12, 15, 10, 14, 9],
      electricity_transfer_days: [5, 4, 4, 3, 3, 2],
      water_transfer_days: [6, 5, 4, 4, 3, 3],
      delivery_satisfaction: [70, 75, 78, 80, 82, 85],
      customer_delivery_days: [7, 6, 5, 4, 4, 3],
      sales_value: [4200000, 6800000, 8500000, 5700000, 7900000, 5100000],
      cash_transfer_days: [30, 28, 25, 22, 20, 18],
      financing_transfer_days: [45, 42, 38, 35, 32, 30],
    }
  },
  yearly: {
    kpis: {
      referral_new_customers: [58, 60, 62, 64, 66],
      referral_after_year: [60, 62, 64, 65, 67],
      referral_old_customers: [25, 27, 29, 30, 32],
      delivery_quality: [90, 92, 94, 95, 97],
      maintenance_quality: [88, 90, 92, 94, 95],
      response_seconds: [4.5, 4.0, 3.8, 3.5, 3.2],
      call_response_rate: [60, 65, 68, 72, 75],
      customer_satisfaction: [65, 67, 69, 70, 72],
      maintenance_closing_speed: [4.5, 4.2, 3.9, 3.7, 3.5],
      ticket_reopening_count: [3, 2, 2, 1, 1],
      facility_management_quality: [70, 74, 77, 80, 82],
      conversion_rate: [1.5, 1.6, 1.7, 1.8, 1.8],
      delivery_satisfaction: [70, 74, 77, 80, 81],
      referred_customers_count: [6000, 6300, 6600, 6800, 7004],
      sales_contribution: [3.5, 3.8, 4.2, 4.5, 4.8],
    },
    delivery: {
      units_sold_monthly: [85, 92, 105, 110, 120, 125, 118, 125, 130, 120, 115, 110],
      electricity_transfer_days: [8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3],
      water_transfer_days: [10, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4],
      delivery_satisfaction: [65, 68, 70, 72, 74, 75, 76, 78, 79, 80, 80, 81],
      customer_delivery_days: [12, 11, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5],
      sales_value: [45000000, 48000000, 52000000, 55000000, 58000000, 60000000, 57000000, 62000000, 65000000, 60000000, 56000000, 54000000],
      cash_transfer_days: [40, 38, 36, 34, 32, 30, 28, 26, 25, 24, 22, 20],
      financing_transfer_days: [60, 55, 52, 50, 48, 45, 42, 40, 38, 36, 34, 32],
    }
  }
};

const AnalyticsPage: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('yearly');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(mockData.yearly);

  useEffect(() => {
    // Update data when timeFrame changes
    setData(timeFrame === 'weekly' ? mockData.weekly : mockData.yearly);
  }, [timeFrame]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1', // text-slate-300
          font: {
            family: 'Cairo, sans-serif',
          }
        }
      },
      tooltip: {
        bodyFont: {
          family: 'Cairo, sans-serif',
        },
        titleFont: {
          family: 'Cairo, sans-serif',
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8', // text-slate-400
          font: {
            family: 'Cairo, sans-serif',
          }
        },
        grid: {
          color: '#334155', // border-slate-700
        }
      },
      y: {
        ticks: {
          color: '#94a3b8', // text-slate-400
          font: {
            family: 'Cairo, sans-serif',
          }
        },
        grid: {
          color: '#334155', // border-slate-700
        }
      }
    }
  };

  // Customer Satisfaction Chart
  const customerSatisfactionData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'راحة العميل (CSAT)',
        data: timeFrame === 'weekly' 
          ? data.kpis.customer_satisfaction
          : [65, 67, 69, 70, 72, 73, 74, 75, 76, 78, 80, 72],
        borderColor: 'rgb(16, 185, 129)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Referral Rates Chart
  const referralRatesData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'نسبة الترشيح للعملاء الجدد',
        data: data.kpis.referral_new_customers,
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3
      },
      {
        label: 'نسبة الترشيح بعد السنة',
        data: data.kpis.referral_after_year,
        borderColor: 'rgb(139, 92, 246)', // purple-500
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3
      },
      {
        label: 'نسبة الترشيح للعملاء القدامى',
        data: data.kpis.referral_old_customers,
        borderColor: 'rgb(249, 115, 22)', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.3
      }
    ]
  };

  // Quality Metrics Chart
  const qualityMetricsData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'جودة التسليم',
        data: data.kpis.delivery_quality,
        borderColor: 'rgb(251, 191, 36)', // amber-500
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        tension: 0.3
      },
      {
        label: 'جودة الصيانة',
        data: data.kpis.maintenance_quality,
        borderColor: 'rgb(236, 72, 153)', // pink-500
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.3
      },
      {
        label: 'جودة إدارة المرافق',
        data: data.kpis.facility_management_quality,
        borderColor: 'rgb(20, 184, 166)', // teal-500
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3
      }
    ]
  };

  // Response Time Chart
  const responseTimeData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'عدد الثواني للرد',
        data: data.kpis.response_seconds,
        borderColor: 'rgb(239, 68, 68)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3
      },
      {
        label: 'سرعة إغلاق طلبات الصيانة (أيام)',
        data: data.kpis.maintenance_closing_speed,
        borderColor: 'rgb(234, 88, 12)', // orange-600
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.3
      }
    ]
  };

  // Delivery Analysis
  const unitsSoldMonthlyData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5', 'الأسبوع 6']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'عدد الوحدات المباعة',
        data: data.delivery.units_sold_monthly,
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  const transferDaysData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5', 'الأسبوع 6']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'عدد أيام نقل عدادات الكهرباء',
        data: data.delivery.electricity_transfer_days,
        borderColor: 'rgb(251, 191, 36)', // amber-500
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        tension: 0.3
      },
      {
        label: 'عدد أيام نقل عدادات الماء',
        data: data.delivery.water_transfer_days,
        borderColor: 'rgb(56, 189, 248)', // light-blue-400
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        tension: 0.3
      },
      {
        label: 'عدد أيام التسليم للعميل',
        data: data.delivery.customer_delivery_days,
        borderColor: 'rgb(139, 92, 246)', // purple-500
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3
      }
    ]
  };

  const deliverySatisfactionData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5', 'الأسبوع 6']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'نسبة رضا العميل عن الاستلام',
        data: data.delivery.delivery_satisfaction,
        borderColor: 'rgb(16, 185, 129)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const salesValueData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5', 'الأسبوع 6']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'قيمة المبيعات (ريال)',
        data: data.delivery.sales_value,
        backgroundColor: 'rgba(245, 158, 11, 0.7)', // amber-600
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1
      }
    ]
  };

  const transferTimeData = {
    labels: timeFrame === 'weekly' 
      ? ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5', 'الأسبوع 6']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'عدد أيام الإفراغ لعملاء الكاش',
        data: data.delivery.cash_transfer_days,
        borderColor: 'rgb(16, 185, 129)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3
      },
      {
        label: 'عدد أيام الإفراغ لعملاء التمويل',
        data: data.delivery.financing_transfer_days,
        borderColor: 'rgb(248, 113, 113)', // red-400
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">التحليلات</h1>
        <TimeFrameToggle timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <div className="flex border-b border-slate-700 mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            أداء لوحة التحكم
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'delivery'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('delivery')}
          >
            تحليل التسليم
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">رضا العميل</h2>
              <div className="h-80">
                <Line options={chartOptions} data={customerSatisfactionData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">نسب الترشيح</h2>
              <div className="h-80">
                <Line options={chartOptions} data={referralRatesData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">مؤشرات الجودة</h2>
              <div className="h-80">
                <Line options={chartOptions} data={qualityMetricsData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">أوقات الاستجابة</h2>
              <div className="h-80">
                <Line options={chartOptions} data={responseTimeData} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">عدد الوحدات المباعة</h2>
              <div className="h-80">
                <Bar options={chartOptions} data={unitsSoldMonthlyData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">مدة نقل العدادات والتسليم (أيام)</h2>
              <div className="h-80">
                <Line options={chartOptions} data={transferDaysData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">نسبة رضا العميل عن الاستلام</h2>
              <div className="h-80">
                <Line options={chartOptions} data={deliverySatisfactionData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">قيمة المبيعات (ريال)</h2>
              <div className="h-80">
                <Bar options={chartOptions} data={salesValueData} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">مدة الإفراغ (أيام)</h2>
              <div className="h-80">
                <Line options={chartOptions} data={transferTimeData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;