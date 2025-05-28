import React from 'react';
import { TimeFrame } from '../types';

interface TimeFrameToggleProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
}

const TimeFrameToggle: React.FC<TimeFrameToggleProps> = ({ timeFrame, setTimeFrame }) => {
  return (
    <div className="flex rounded-md overflow-hidden mb-6">
      <button
        onClick={() => setTimeFrame('weekly')}
        className={`px-6 py-2 ${
          timeFrame === 'weekly'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300'
        }`}
      >
        أسبوعي
      </button>
      <button
        onClick={() => setTimeFrame('yearly')}
        className={`px-6 py-2 ${
          timeFrame === 'yearly'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300'
        }`}
      >
        سنوي
      </button>
    </div>
  );
};

export default TimeFrameToggle;