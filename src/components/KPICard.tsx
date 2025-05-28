import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  BarChart,
  CheckCircle,
  Phone,
  AlertCircle,
  RefreshCcw,
  Activity,
  Heart,
  Percent,
  Building
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  target: number | string;
  changePercentage: number;
  icon?: string;
  unit?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  target,
  changePercentage,
  icon = 'chart',
  unit = ''
}) => {
  // Convert values to numbers for comparison
  const numericValue = typeof value === 'string' ? parseFloat(value.toString()) : value;
  const numericTarget = typeof target === 'string' ? parseFloat(target.toString()) : target;
  
  const percentOfTarget = (numericValue / numericTarget) * 100;
  
  let statusClass = '';
  if (percentOfTarget >= 95) {
    statusClass = 'status-good';
  } else if (percentOfTarget >= 75) {
    statusClass = 'status-warning';
  } else {
    statusClass = 'status-bad';
  }

  // Some metrics are inverted (lower is better)
  const invertedMetrics = ['عدد الثواني للرد', 'سرعة إغلاق طلبات الصيانة', 'عدد إعادة فتح طلب', 'معدل الرد على المكالمات'];
  if (invertedMetrics.includes(title)) {
    if (numericValue <= numericTarget) {
      statusClass = 'status-good';
    } else if (numericValue <= numericTarget * 1.25) {
      statusClass = 'status-warning';
    } else {
      statusClass = 'status-bad';
    }
  }

  // Icon selection
  const renderIcon = () => {
    switch (icon) {
      case 'users':
        return <Users className="text-blue-400" size={24} />;
      case 'time':
        return <Clock className="text-yellow-400" size={24} />;
      case 'check':
        return <CheckCircle className="text-green-400" size={24} />;
      case 'phone':
        return <Phone className="text-indigo-400" size={24} />;
      case 'alert':
        return <AlertCircle className="text-red-400" size={24} />;
      case 'refresh':
        return <RefreshCcw className="text-orange-400" size={24} />;
      case 'activity':
        return <Activity className="text-pink-400" size={24} />;
      case 'heart':
        return <Heart className="text-red-400" size={24} />;
      case 'percent':
        return <Percent className="text-green-400" size={24} />;
      case 'building':
        return <Building className="text-blue-400" size={24} />;
      default:
        return <BarChart className="text-blue-400" size={24} />;
    }
  };

  // Format numbers with commas and fixed decimals
  const formatNumber = (num: number | string) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (Number.isInteger(n)) {
      return n.toLocaleString('ar-SA');
    }
    return n.toFixed(1).toLocaleString('ar-SA');
  };

  return (
    <div className={`status-card ${statusClass}`}>
      <div className="flex justify-between items-start mb-4">
        {renderIcon()}
        <div className="flex items-center">
          {changePercentage > 0 ? (
            <TrendingUp className="text-green-400 ml-1" size={16} />
          ) : (
            <TrendingDown className="text-red-400 ml-1" size={16} />
          )}
          <span className={`text-sm font-medium ${changePercentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {Math.abs(changePercentage)}%
          </span>
        </div>
      </div>
      <div className="text-right">
        <h3 className="text-lg text-slate-400 mb-2">{title}</h3>
        <p className="text-3xl font-bold mb-2 number">
          {formatNumber(value)}
          {unit && <span className="text-sm mr-1 text-slate-400">{unit}</span>}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            الهدف: {formatNumber(target)}
            {unit && unit}
          </p>
          <div 
            className="h-1 w-24 bg-slate-700 rounded-full overflow-hidden"
            title={`${percentOfTarget.toFixed(1)}% من الهدف`}
          >
            <div 
              className={`h-full rounded-full ${
                statusClass === 'status-good' ? 'bg-green-500' :
                statusClass === 'status-warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${Math.min(percentOfTarget, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;