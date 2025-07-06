
import React from 'react';

interface DayProgressProps {
  schedule: Array<{ time: string; activity: string; isBreak?: boolean }>;
  currentTime: Date;
}

export const DayProgress: React.FC<DayProgressProps> = ({ schedule, currentTime }) => {
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(currentTime);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const startTime = parseTime(schedule[0]?.time.split(' – ')[0] || '09:00');
  const endTime = parseTime(schedule[schedule.length - 1]?.time.split(' – ')[1] || '18:00');
  
  const totalDuration = endTime.getTime() - startTime.getTime();
  const elapsed = Math.max(0, currentTime.getTime() - startTime.getTime());
  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  const today = new Date().getDay();
  const isActiveDay = today === 1 || today === 2; // Понедельник или вторник

  if (!isActiveDay) return null;

  return (
    <div className="px-3 pb-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Прогресс дня</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-[#02a374] h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
