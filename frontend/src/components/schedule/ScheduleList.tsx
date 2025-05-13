import React from 'react';
import { DaySchedule } from '../../types';
import ScheduleCard from './ScheduleCard';
import useStravaEmbed from '../../hooks/useStravaEmbed';

interface ScheduleListProps {
  scheduleData: DaySchedule[];
  expandedDay: string | null;
  activeTab: Record<string, string>;
  isLoggedIn: boolean;
  toggleDay: (id: string) => void;
  handleTabChange: (dayId: string, tab: string) => void;
  onEdit: (route: DaySchedule) => void;
  onDelete: (id: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  scheduleData,
  expandedDay,
  activeTab,
  isLoggedIn,
  toggleDay,
  handleTabChange,
  onEdit,
  onDelete
}) => {
  // Use our custom hook to handle Strava embed functionality
  useStravaEmbed({ expandedDay, activeTab, scheduleData });

  if (scheduleData.length === 0) {
    return <p className="text-center text-text-300 py-8">No scheduled routes available.</p>;
  }

  return (
    <div className="space-y-4">
      {scheduleData.map((day) => (
        <ScheduleCard
          key={day.id}
          day={day}
          isExpanded={expandedDay === day.id}
          activeTab={activeTab[day.id] || 'details'}
          isLoggedIn={isLoggedIn}
          onToggle={() => toggleDay(day.id)}
          onTabChange={(tab) => handleTabChange(day.id, tab)}
          onEdit={() => onEdit(day)}
          onDelete={() => onDelete(day.id)}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
