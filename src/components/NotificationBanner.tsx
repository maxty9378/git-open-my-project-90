
import React from 'react';
import { Bell, Clock } from 'lucide-react';

interface NotificationBannerProps {
  currentActivity?: {
    time: string;
    activity: string;
    nextActivity?: string;
  };
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ currentActivity }) => {
  const today = new Date().getDay();
  const isActiveDay = today === 1 || today === 2; // Понедельник или вторник
  
  if (!currentActivity || !isActiveDay) return null;

  return (
    <div className="bg-[#02a374]/20 border border-[#02a374]/30 rounded-lg p-3 mx-3 mb-2 mt-3 animate-pulse">
      <div className="flex items-center gap-2 mb-1">
        <Bell className="w-4 h-4 text-[#02a374]" />
        <span className="text-xs font-medium text-[#02a374]">Сейчас идет</span>
      </div>
      <p className="text-sm text-gray-200 mb-1">{currentActivity.activity}</p>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Clock className="w-3 h-3" />
        <span>{currentActivity.time}</span>
      </div>
      {currentActivity.nextActivity && (
        <p className="text-xs text-gray-500 mt-1">
          Далее: {currentActivity.nextActivity}
        </p>
      )}
    </div>
  );
};
